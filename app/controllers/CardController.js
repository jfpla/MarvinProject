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
  const view = await CardView();
  for (const data of dataList) {
    yield await HydrateCardTemplate(data, view);
  }
};

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

const btnWatchlist = (element) => {
  const result = element.querySelector(".back > .buttons > button:first-child");
  return result;
};

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @param {Element|Node} template
 * @return {Promise<Node[]>}
 */
const HydrateCardTemplate = async (data, template = null) => {
  const cs = CardSchema(data);
  const view = (await template.getClone()) || (await CardView());

  /**
   *
   * @param {Element} e
   * @return {Promise<Element>}
   */
  const populateData = async (e) => {
    const thumbnail = e.querySelector(".front .thumbnail");
    const name = e.querySelector(".front .name");
    const background = e.querySelector(".background img");
    const viewers = e.querySelector(".viewers");
    const rank = e.querySelector(".rank i");
    const voteAvg = e.querySelector(".back > .streaming-info > p:first-child");
    const voteCnt = e.querySelector(".back > .streaming-info > p:last-child");

    name.textContent = cs.data.frontName;
    thumbnail.src = cs.data.frontThumbnail;
    background.src = cs.data.backgroundImage;
    viewers.textContent = cs.data.frontStatsViewers;
    rank.classList.remove("fa-user");
    rank.classList.add(cs.data.rank);
    voteAvg.firstChild.textContent = cs.data.backStreamingInfoLeftData;
    voteAvg.lastChild.textContent = cs.data.backStreamingInfoLeftName;
    voteCnt.firstChild.textContent = cs.data.backStreamingInfoRightData;
    voteCnt.lastChild.textContent = cs.data.backStreamingInfoRightName;

    // const btnDetails = view.querySelector(
    //   ".back > .buttons > button:last-child"
    // );
    // console.log(btnWatchlist, btnDetails);

    return e;
  };

  /**
   *
   * @param {Element} element
   * @return {Promise<Element>}
   */
  const populateEventListeners = async (element) => {
    let watchlistItem = await cs.methods.getItemDetailById(cs.data.id);

    if (watchlistItem) {
      console.log(watchlistItem);
      watchlistBtnToggleCallback(btnWatchlist(element), true)();
    }

    const btnW = btnWatchlist(element);
    btnW.addEventListener("click", async (e) => {
      if (watchlistItem) {
        await cs.methods.deleteItemDetailById(
          watchlistItem.id,
          watchlistBtnToggleCallback(btnW, false) // not needed. 'cause the card is rehydrated
        );
      } else {
        await cs.methods.saveItemDetail(
          data.id,
          await cs.methods.fetchItemDetailById(data.id),
          watchlistBtnToggleCallback(btnW, true) // not needed. 'cause the card is rehydrated
        );
      }
      if (e.target.parentElement?.parentElement?.parentElement) {
        e.target.parentElement.parentElement.parentElement.replaceWith(
          ...(await HydrateCardTemplate(data))
        );
      }
    });
    const images = element.querySelectorAll("img");
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

    return element;
  };

  const newView = await view.map(populateData);
  return await newView.map(populateEventListeners);
};

export default HydrateCardTemplate;
