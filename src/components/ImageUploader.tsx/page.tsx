"use client";

import React, { useState, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded?: (url: string) => void;
  maxSizeInMB?: number;
  allowedFileTypes?: string[];
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  maxSizeInMB = 5,
  allowedFileTypes = ["image/jpeg", "image/png", "image/webp"],
}) => {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");

  const validateFile = (file: File): boolean => {
    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      setError("File type not supported");
      return false;
    }

    return true;
  };

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    try {
      setLoading(true);
      setError("");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      // Debug logs
      console.log("Cloud Name:", cloudName);
      console.log("Upload Preset:", uploadPreset);

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        // Get the error details from response
        const errorData = await response.json();
        console.error("Cloudinary Error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = (await response.json()) as CloudinaryResponse;
      setCloudinaryUrl(data.secure_url);
      onImageUploaded?.(data.secure_url);
      return data.secure_url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image";
      setError(`Upload failed: ${errorMessage}`);
      console.error("Upload error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError("");
    setPreview("");
    setCloudinaryUrl("");

    // Validate file
    if (!validateFile(file)) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    await uploadToCloudinary(file);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors
          ${loading ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-gray-400"}`}
      >
        <input
          type="file"
          accept={allowedFileTypes.join(",")}
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />

        <div className="space-y-2 text-center">
          {preview ? (
            <div className="relative w-full aspect-video">
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Upload className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click or drag image to upload
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {`Supported formats: ${allowedFileTypes.map((type) => type.split("/")[1]).join(", ")}`}
              </p>
              <p className="text-xs text-gray-400">
                {`Max size: ${maxSizeInMB}MB`}
              </p>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-sm text-gray-500">Uploading...</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {cloudinaryUrl && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Cloudinary URL:</p>
          <p className="mt-1 text-sm text-gray-500 break-all">
            {cloudinaryUrl}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;