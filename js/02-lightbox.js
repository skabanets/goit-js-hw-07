import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
};

const createGalleryItemTemplate = ({ preview, original, description }) => {
  return `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`;
};

const createGalleryItemsTemplate = (items) => {
  return items.map(createGalleryItemTemplate).join("");
};

const renderGallery = (items) => {
  const markup = createGalleryItemsTemplate(items);
  refs.gallery.innerHTML = markup;
};

renderGallery(galleryItems);

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
