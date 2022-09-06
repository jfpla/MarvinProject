import CardView from "../views/card/CardView.js";
import CardSchema from "../schemas/card/CardSchema.js";

/**
 *
 * @param {string} url
 * @param {number} n
 * @return {(function(): Promise<void>)|*}
 */
const retryFetchImage = (url, n = 0) => {
  return async () => {
    console.log(`Retry image fetch: ${url}`);
    const response = await fetch(url);
    if (response.status === 429 && n < 3) {
      n += 1;
      console.log(`HTTP429 ${url}; attempt ${n} `);
      setTimeout(await retryFetchImage(url, n), 150);
    }
  };
};

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)[]} dataList
 * @return {AsyncGenerator<Node[], void, *>}
 * @constructor
 */
export const HydrateCardTemplateGenerator = async function* (dataList) {
  const cardTemplate = await CardView();
  for (const data of dataList) {
    yield await HydrateCardTemplate(data, cardTemplate.cloneNode(true));
  }
};

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @param {Element|Node} template
 * @return {Promise<Node[]>}
 */
const HydrateCardTemplate = async (data, template = null) => {
  const cs = CardSchema(data);
  // console.log("data", data);
  // console.log("CardSchema", cs);
  const cardTemplate = template || (await CardView());

  const thumbnail = cardTemplate.querySelector(".front .thumbnail");
  const title = cardTemplate.querySelector(".front .name");
  const background = cardTemplate.querySelector(".background img");
  const rank = cardTemplate.querySelector(".rank i");
  const viewers = cardTemplate.querySelector(".viewers");
  const voteAvg = cardTemplate.querySelector(
    ".back > .streaming-info > p:first-child"
  );
  const voteCnt = cardTemplate.querySelector(
    ".back > .streaming-info > p:last-child"
  );
  // const overview = cardTemplate.querySelector(".back > p:first-of-type");
  const btnWatchlist = (element) =>
    element.querySelector(".back > .buttons > button:first-child");
  // const btnDetails = cardTemplate.querySelector(
  //   ".back > .buttons > button:last-child"
  // );
  // console.log(btnWatchlist, btnDetails);

  title.textContent = cs.data.frontName;
  thumbnail.src = cs.data.frontThumbnail;
  background.src = cs.data.backgroundImage;
  rank.classList.remove("fa-user");
  rank.classList.add(cs.data.rank);
  viewers.textContent = cs.data.frontStatsViewers;
  voteAvg.firstChild.textContent = cs.data.backStreamingInfoLeftData;
  voteAvg.lastChild.textContent = cs.data.backStreamingInfoLeftName;
  voteCnt.firstChild.textContent = cs.data.backStreamingInfoRightData;
  voteCnt.lastChild.textContent = cs.data.backStreamingInfoRightName;

  let watchlistItem = await cs.methods.getItemDetailById(cs.data.id);

  const watchlistBtnToggleCallback = (btn, selected) => {
    return () => {
      if (selected) {
        btn.classList.add("btn-selected");
        btn.textContent = "Remove from Watchlist";
      } else {
        btn.classList.remove("btn-selected");
        btn.textContent = "Add to Watchlist";
      }
    };
  };

  if (watchlistItem) {
    console.log(watchlistItem);
    watchlistBtnToggleCallback(btnWatchlist(cardTemplate), true)();
  }

  return [...cardTemplate.cloneNode(true).childNodes].map((node) => {
    // An Element Node Type is needed. That is when nodeType is 1.
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    if (node.nodeType !== 1) return node;

    const btnW = btnWatchlist(node); // node.querySelector(".back > .buttons > button:first-child");
    btnW.addEventListener("click", async (e) => {
      if (watchlistItem) {
        await cs.methods.deleteItemDetailById(watchlistItem.id, () => {
          watchlistBtnToggleCallback(btnW, false);
        });
      } else {
        await cs.methods.saveItemDetail(
          data.id,
          await cs.methods.fetchItemDetailById(data.id),
          watchlistBtnToggleCallback(btnW, true)
        );
      }
      if (e.target.parentElement?.parentElement?.parentElement) {
        e.target.parentElement.parentElement.parentElement.replaceWith(
          ...(await HydrateCardTemplate(data))
        );
      }
    });

    const images = node.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("error", async (e) => {
        console.log("imgError", e.target);
        await retryFetchImage(e.target.src)();
        if (e.target.parentElement?.parentElement) {
          e.target.parentElement.parentElement.replaceWith(
            ...(await HydrateCardTemplate(data))
          );
        }
      });
    });

    return node;
  });
};

export default HydrateCardTemplate;
