export interface Diary {
  diaryId: number;
  title: string;
  originalContent: string;
  imageSelected: boolean;
  tags: Tag[];
  candidateImageUrls: Image[];
  mainImageUrl: Image[];
}

export interface Tag {
  engTag: string;
  korTag: string;
}

export interface Image {
  imageId: number;
  imageUrl: string;
}
