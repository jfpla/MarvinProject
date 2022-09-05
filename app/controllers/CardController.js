import CardView from "../views/card/CardView.js";
import CardSchema from "../schemas/card/CardSchema.js";

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @return {Promise<Node[]>}
 */
const HydrateCardTemplate = async (data) => {
  const cs = CardSchema(data);
  // console.log("data", data);
  // console.log("CardSchema", cs);
  const cardTemplate = await CardView();

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

    return node;
  });
};

export default HydrateCardTemplate;
