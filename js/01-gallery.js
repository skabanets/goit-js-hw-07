import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
};

const createGalleryItemTemplate = ({ preview, original, description }) => {
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

const createGalleryItemsTeamplate = (items) => {
  return items.map(createGalleryItemTemplate).join("");
};

const renderGallery = (items) => {
  const markup = createGalleryItemsTeamplate(items);
  console.log(markup);
  refs.gallery.innerHTML = markup;
};

renderGallery(galleryItems);

const instance = basicLightbox.create(
  `
    <div class="modal">
        <img class="modal-image"> 
    </div>
`,
  {
    onShow: () => {
      document.addEventListener("keydown", onModalKeydown);
    },
    onClose: () => {
      document.removeEventListener("keydown", onModalKeydown);
    },
  }
);

const onModalKeydown = (e) => {
  console.log(e.key);
  if (e.key === "Escape") {
    instance.close();
    return;
  }
};

const onGalleryItemClick = (e) => {
  e.preventDefault();
  if (e.target === e.currentTarget) return;

  instance.show();
  const largeImageSrc = e.target.dataset.source;
  const image = document.querySelector(".modal-image");
  image?.setAttribute("src", largeImageSrc);
};

refs.gallery.addEventListener("click", onGalleryItemClick);
