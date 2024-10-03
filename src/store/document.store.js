import { create } from 'zustand';
import { createNewDocumentObj } from '../services/document';

export const useDocumentStore = create((set, get) => {
	return {
		documents: [],
		selectedDocumentId: null,
		createNewDocument: (navigate) => {
			const newDocument = createNewDocumentObj();

			set((state) => {
				return {
					documents: [newDocument, ...state.documents]
				};
			});

			navigate(`/documentos/${newDocument.id}`);
		},

		getById: (id) => {
			const state = get();

			const foundedDocument = state.documents.find((doc) => {
				return doc.id === id;
			});

			return foundedDocument;
		},
		editDocument: (documentId, file) => {
			set((state) => {
				const cloneDocuments = structuredClone(state.documents);

				let foundedDocument = cloneDocuments.find((doc) => {
					return doc.id === documentId;
				});

				if (!foundedDocument) return { documents: [...state.documents] };

				foundedDocument.text = file.name;
				foundedDocument.file = file;

				return { documents: cloneDocuments };
			});
		},
		removeFile: (documentId) => {
			const cloneDocuments = structuredClone(get().documents);

			const foundedDocument = cloneDocuments.find((doc) => {
				return doc.id === documentId;
			});

			if (!foundedDocument) return;

			delete foundedDocument.file;

			set((state) => {
				return { ...state, documents: cloneDocuments };
			});
		},
		getSelectedDocument: () => {
			const state = get();
			return state.documents.find((doc) => doc.id === state.selectedDocumentId) || null;
		},
		selectDocumentById: (id) => {
			const store = get();

			const ifExist = store.documents.find((doc) => doc.id === id);

			if (!ifExist) return false;

			set({ selectedDocumentId: id });

			return true;
		}
	};
});
