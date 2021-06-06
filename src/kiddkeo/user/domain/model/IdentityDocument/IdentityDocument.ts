import { IdentityDocumentDto } from '@root/kiddkeo/user/domain/model/IdentityDocument/identityDocument.dto';

export class IdentityDocument {
  documentType: string;

  document: string;

  constructor(documentType: string, document: string) {
    this.documentType = documentType;
    this.document = document;
  }

  toDto():IdentityDocumentDto {
    return {
      documentType: this.documentType,
      document: this.document,
    };
  }
}
