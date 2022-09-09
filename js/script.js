/* eslint-disable indent */
const getData = (url) => fetch(url).then((respone) => respone.json());

const hideAllResponseBlocks = () => {
  const responseBlocksArray = Array.from(
    document.querySelectorAll("div.dialog__response-block")
  );
  responseBlocksArray.forEach((block) => (block.style.display = "none"));
};
const showResponseBlock = (blockSelector, msgText, spanSelector) => {
  hideAllResponseBlocks();
  document.querySelector(blockSelector).style.display = "block";
  if (spanSelector) {
    document.querySelector(spanSelector).textContent = msgText;
  }
};
const showError = (msgText) =>
  showResponseBlock(".dialog__response-block_error", msgText, "#error");
const showResults = (msgText) =>
  showResponseBlock(".dialog__response-block_ok", msgText, "#ok");

const renderData = (data) => {
  const result = ["Тачка ", "Цена "];
  result[0] += data.brand + " " + data.model;
  result[1] += data.price;
  showResults(result.join("; "));
};

const select = document.querySelector(".filter-form__input");

select.addEventListener("change", (e) => {
  try {
    getData("cars.json")
      .then((data) => renderData(data.cars[e.target.options.selectedIndex]))
      .catch((error) => showError(`Error: ${error}`));
  } catch (error) {
    showError("error");
  }
});
