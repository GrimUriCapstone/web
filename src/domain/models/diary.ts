export interface Diary {
  diaryId: number;
  title: string;
  originalContent: string;
  imageSelected: boolean;
  tags: Tag[];
  candidateImageUrls: Photo[];
  mainImageUrl: Photo;
  writerEmail: string;
  writerNickname: string;
  modifiedAt: string;
  profileImage: string;
  createdAt: string;
}

export interface Tag {
  engTag: string;
  korTag: string;
}

export interface Photo {
  imageId: number;
  imageUrl: string;
}
