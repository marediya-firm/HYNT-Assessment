import {
  launchCamera,
  launchImageLibrary,
  Asset,
  CameraOptions,
} from "react-native-image-picker";
import { MediaAttachment } from "../models/Task";

type MediaResponse = {
  didCancel?: boolean;
  errorCode?: string;
  errorMessage?: string;
  assets?: Asset[];
};

const mediaOptions = {
  mediaType: "mixed",
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
  videoQuality: "low",
  durationLimit: 30,
  saveToPhotos: false,
};

export const captureMedia = (
  isVideo: boolean = false
): Promise<MediaAttachment> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      ...(mediaOptions as CameraOptions),
      mediaType: isVideo ? "video" : "photo",
    };

    launchCamera(options, (response: MediaResponse) => {
      handleMediaResponse(response, resolve, reject);
    });
  });
};

export const pickMediaFromLibrary = (
  isVideo: boolean = false
): Promise<MediaAttachment> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      ...(mediaOptions as CameraOptions),
      mediaType: isVideo ? "video" : "photo",
    };

    launchImageLibrary(options, (response: MediaResponse) => {
      handleMediaResponse(response, resolve, reject);
    });
  });
};

const handleMediaResponse = (
  response: MediaResponse,
  resolve: (media: MediaAttachment) => void,
  reject: (error: Error) => void
) => {
  if (response.didCancel) {
    reject(new Error("User cancelled media picker"));
  } else if (response.errorCode) {
    reject(new Error(response.errorMessage || "Unknown error"));
  } else if (response.assets && response.assets[0]) {
    const media = response.assets[0];
    resolve({
      uri: media.uri || "",
      type: media.type || "image/jpeg",
      fileName: media.fileName || `media_${Date.now()}`,
      fileSize: media.fileSize || 0,
    });
  } else {
    reject(new Error("No media selected"));
  }
};
