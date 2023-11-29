import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
};

const galleryItemTemplate = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

const galleryItemsTeamplate = (items) => {
  return items.map(galleryItemTemplate).join("");
};

const renderGallery = (items) => {
  const markup = galleryItemsTeamplate(items);
  console.log(markup);
  refs.gallery.innerHTML = markup;
};

renderGallery(galleryItems);

const instance = basicLightbox.create(`
    <div class="modal">
        <img class="modal-image"> 
    </div>
`);

const onModalKeydown = (e) => {
  if (e.key === "Escape") {
    instance.close();
    document.removeEventListener("keydown", onModalKeydown);
  }
};

const onGalleryItemClick = (e) => {
  e.preventDefault();
  if (e.target === e.currentTarget) return;

  instance.show();
  const largeImageSrc = e.target.dataset.source;
  const image = document.querySelector(".modal-image");
  image?.setAttribute("src", largeImageSrc);

  document.addEventListener("keydown", onModalKeydown);
};

refs.gallery.addEventListener("click", onGalleryItemClick);
