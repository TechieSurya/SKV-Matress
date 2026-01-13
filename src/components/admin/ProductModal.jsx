import React, { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Upload,
  Trash2,
  Loader2,
  Package,
  DollarSign,
  FileText,
  Settings,
  ImageIcon,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "@/hooks/use-toast";

const InfoTooltip = ({ text }) => (
  <div className="group relative ml-2 inline-flex">
    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground border border-border shadow-md text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center">
      {text}
    </div>
  </div>
);

const EMPTY_SIZE = () => ({
  id: Date.now() + Math.random(),
  name: "",
  dimensions: "",
  price: "",
});

const ProductModal = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "mattress",
    description: "",
    short_description: "",
    price: "",
    original_price: "",
    images: [],
    badge: "",
    in_stock: true,
    sku: "",
    meta_title: "",
    meta_description: "",
    sizes: [EMPTY_SIZE()],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  /* ✅ SINGLE SAFE useEffect */
  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name || "",
      category: product.category || "mattress",
      description: product.description || "",
      short_description: product.short_description || "",
      price: product.price?.toString() || "",
      original_price: product.original_price?.toString() || "",
      images: Array.isArray(product.images) ? product.images : [],
      badge: product.badge || "",
      in_stock: product.in_stock ?? true,
      sku: product.sku || "",
      meta_title: product.meta_title || "",
      meta_description: product.meta_description || "",
      sizes:
        Array.isArray(product.sizes) && product.sizes.length
          ? product.sizes.map((s) => ({
            id: Date.now() + Math.random(),
            name: s.name || "",
            dimensions: s.dimensions || "",
            price: s.price?.toString() || "",
          }))
          : [EMPTY_SIZE()],
    });
  }, [product]);

  /* ✅ SYNC PRICE WITH FIRST SIZE */
  useEffect(() => {
    if (formData.sizes && formData.sizes.length > 0) {
      const firstSizePrice = formData.sizes[0].price;
      if (firstSizePrice !== undefined && firstSizePrice !== formData.price) {
        setFormData((prev) => ({ ...prev, price: firstSizePrice }));
      }
    }
  }, [formData.sizes]);

  /* ✅ SAFE IMAGE COMPRESSION */
  const compressImage = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.75);
      };

      reader.readAsDataURL(file);
    });

  /* ✅ FIXED IMAGE UPLOAD */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const compressed = await compressImage(file);
        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

        // Create a unique filename
        const filename = `products/${Date.now()}_${safeName}`;

        // Use the proxy endpoint to bypass CORS
        // We are uploading to: /api/storage/v0/b/[BUCKET]/o?name=[FILENAME]
        const bucketName = "mattress-31654.firebasestorage.app";
        const uploadUrl = `/api/storage/v0/b/${bucketName}/o?name=${encodeURIComponent(filename)}`;

        // Perform the upload using fetch (proxied)
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": file.type,
          },
          body: compressed
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Upload proxy error:", errorText);
          throw new Error(`Upload failed (${response.status}): ${errorText || response.statusText}`);
        }

        const data = await response.json();

        // Construct the download URL manually from the response
        // format: https://firebasestorage.googleapis.com/v0/b/[BUCKET]/o/[NAME]?alt=media&token=[TOKEN]
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filename)}?alt=media&token=${data.downloadTokens}`;

        uploadedUrls.push(downloadUrl);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      toast({ title: "Images uploaded successfully 🚀" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Upload failed",
        description: "Check Firebase Storage rules",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  /* SIZE MANAGEMENT */
  const addSize = () =>
    setFormData((p) => ({ ...p, sizes: [...p.sizes, EMPTY_SIZE()] }));

  const removeSize = (id) =>
    setFormData((p) => ({
      ...p,
      sizes: p.sizes.filter((s) => s.id !== id),
    }));

  const updateSize = (id, key, value) =>
    setFormData((p) => ({
      ...p,
      sizes: p.sizes.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
    }));

  const removeImage = (i) =>
    setFormData((p) => ({
      ...p,
      images: p.images.filter((_, idx) => idx !== i),
    }));

  /* ✅ SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        original_price: formData.original_price
          ? Number(formData.original_price)
          : null,
        image_url: formData.images[0] ?? null,
        sizes: formData.sizes.map((s) => ({
          name: s.name,
          dimensions: s.dimensions,
          price: Number(s.price),
        })),
        updated_at: serverTimestamp(),
      };

      if (product) {
        await updateDoc(doc(db, "products", product.id), productData);
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          created_at: serverTimestamp(),
        });
      }

      toast({ title: "Product saved successfully" });
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Save failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const handleImageDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(formData.images);
  const [moved] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, moved);

  setFormData((prev) => ({
    ...prev,
    images: items,
  }));
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {product
                ? "Update existing product details"
                : "Create a new product for your store"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted/30">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Product Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Product Name *
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="e.g. Premium Cotton Mattress"
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Short Description
                    </label>
                    <input
                      value={formData.short_description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          short_description: e.target.value,
                        })
                      }
                      placeholder="Brief summary for product cards"
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Full Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={6}
                      placeholder="Detailed product description..."
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Media Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Media</h3>
                </div>

                <div className="space-y-4">
                  <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 hover:bg-muted/50 transition-colors text-center group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {isUploading
                            ? "Uploading..."
                            : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          SVG, PNG, JPG or GIF (max. 800x400px)
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
  <DragDropContext onDragEnd={handleImageDragEnd}>
    <Droppable droppableId="images" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="grid grid-cols-3 sm:grid-cols-4 gap-4"
        >
          {formData.images.map((url, index) => (
            <Draggable
              key={url}
              draggableId={url}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="relative group aspect-square bg-muted rounded-lg overflow-hidden border border-border shadow-sm cursor-move"
                >
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Delete Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Image Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] rounded-md font-medium">
                      Main
                    </div>
                  )}

                  {/* Order Number */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] rounded-md">
                    {index + 1}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)}

                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setSeoOpen(!seoOpen)}
                  className="flex items-center justify-between w-full p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Search Engine Optimization
                    </h3>
                  </div>
                  {seoOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {seoOpen && (
                  <div className="p-6 pt-0 space-y-4 border-t border-border mt-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <label className="text-sm font-medium text-foreground">
                          Meta Title
                        </label>
                        <InfoTooltip text="The title that appears in search results. Keep under 60 characters." />
                      </div>
                      <input
                        value={formData.meta_title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            meta_title: e.target.value,
                          })
                        }
                        placeholder={
                          formData.name || "Product name | Ilavam Panju"
                        }
                        maxLength={60}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-xs ${formData.meta_title.length > 60
                            ? "text-red-500"
                            : "text-muted-foreground"
                            }`}
                        >
                          {formData.meta_title.length}/60
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <label className="text-sm font-medium text-foreground">
                          Meta Description
                        </label>
                        <InfoTooltip text="Description shown in search results. Keep under 160 characters." />
                      </div>
                      <textarea
                        value={formData.meta_description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            meta_description: e.target.value,
                          })
                        }
                        placeholder="Brief description for search engines..."
                        maxLength={160}
                        rows={3}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-xs ${formData.meta_description.length > 160
                            ? "text-red-500"
                            : "text-muted-foreground"
                            }`}
                        >
                          {formData.meta_description.length}/160
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SIZE MANAGEMENT */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                  <h3 className="font-semibold text-foreground">
                    Sizes & Pricing
                  </h3>
                  <button
                    type="button"
                    onClick={addSize}
                    className="text-sm text-primary font-medium"
                  >
                    + Add Size
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.sizes.map((size) => (
                    <div
                      key={size.id}
                      className="grid grid-cols-4 gap-3 items-center"
                    >
                      <input
                        placeholder="Size Name"
                        value={size.name}
                        onChange={(e) =>
                          updateSize(size.id, "name", e.target.value)
                        }
                        className="px-3 py-2 border rounded-lg"
                      />

                      <input
                        placeholder="Dimensions"
                        value={size.dimensions}
                        onChange={(e) =>
                          updateSize(size.id, "dimensions", e.target.value)
                        }
                        className="px-3 py-2 border rounded-lg"
                      />

                      <input
                        type="number"
                        placeholder="Price"
                        value={size.price}
                        onChange={(e) =>
                          updateSize(size.id, "price", e.target.value)
                        }
                        className="px-3 py-2 border rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() => removeSize(size.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Product Status
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                    <span className="text-sm font-medium text-foreground">
                      In Stock
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.in_stock}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            in_stock: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="mattress">Mattress</option>
                      <option value="pillow">Pillow</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Badge
                    </label>
                    <input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      placeholder="e.g. New Arrival"
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Pricing</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Base Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Original Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={formData.original_price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            original_price: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Set higher than base price to show a discount.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inventory Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Inventory</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="e.g. MAT-001"
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-card flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium flex items-center gap-2 shadow-lg shadow-primary/25"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : product ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
