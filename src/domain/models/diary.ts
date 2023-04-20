export interface Diary {
  diaryId: number;
  title: string;
  originalContent: string;
  imageSelected: boolean;
  tags: Tag[];
  candidateImageUrls: Photo[];
  mainImageUrl: Photo[];
}

export interface Tag {
  engTag: string;
  korTag: string;
}

export interface Photo {
  imageId: number;
  imageUrl: string;
}
