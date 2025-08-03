import { ScanPathData, GenerateThumbnailData, type RefreshMetadata, type RefreshLibraryMetadata } from "../../dto"

export type JobData =
  | ScanPathData
  | GenerateThumbnailData
  | RefreshMetadata
  | RefreshLibraryMetadata