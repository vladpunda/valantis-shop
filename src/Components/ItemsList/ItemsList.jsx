import { useEffect, useState } from "react";
import { getIdItem, getItem } from "../../API/Api";
import ItemsRow from "./ItemsRow/ItemsRow";
import ItemsHeader from "./ItemsHeader/ItemsHeader";
import classes from "./ItemList.module.scss";
import MySelect from "../../UI/select/MySelect";
import MyInput from "../../UI/input/MyInput";
import Button from "../../UI/Button/Button";
import { ReactComponent as Loader } from "../../Assets/Icons/Loader.svg";
export default function ItemList() {
  const [arrItem, setArrItem] = useState([]);
  const [offsetNumber, setOffsetNumber] = useState({
    action: "get_ids",
    params: { offset: 0, limit: 100 },
  });
  const [inputForSearch, setInputForSearch] = useState("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filterArr = (arrItem) => {
    const addedIds = new Set();
    const resultArr = [];
    arrItem.forEach((item) => {
      if (addedIds.has(item.id) || resultArr.length >= 50) {
        return;
      } else {
        addedIds.add(item.id);
        resultArr.push(item);
      }
    });
    return resultArr;
  };
  const getItems = async (idsArr) => {
    try {
      const itemsResponse = await getItem(idsArr);
      const filteredItems = filterArr(itemsResponse.data.result);
      setArrItem(filteredItems);
      setLoading(false);
    } catch (error) {
      console.log(error.code);
      getItems(idsArr);
    }
  };
  const getIds = async (offsetNumber) => {
    try {
      setLoading(true);
      const idsResponse = await getIdItem(offsetNumber);
      getItems(idsResponse.data.result);
    } catch (error) {
      console.log(error.code);
      getIds(offsetNumber);
    }
  };

  useEffect(() => {
    getIds(offsetNumber);
    // eslint-disable-next-line
  }, [offsetNumber]);

  const handlePageClick = (limNumber) => {
    if (isNaN(offsetNumber.params.offset)) {
      setOffsetNumber({
        action: "get_ids",
        params: { offset: 0, limit: 100 },
      });
    } else {
      const newNumber = offsetNumber.params.offset + limNumber;
      const newOffSet = {
        action: "get_ids",
        params: { offset: newNumber, limit: 100 },
      };
      setOffsetNumber(newOffSet);
    }
    window.scrollTo(0, 0);
  };

  const handlerFilter = (inputForSearch, searchQuery) => {
    if (inputForSearch === "product") {
      setOffsetNumber({
        action: "filter",
        params: { product: searchQuery },
      });
    } else if (inputForSearch === "price") {
      setOffsetNumber({
        action: "filter",
        params: { price: +searchQuery },
      });
    } else {
      setOffsetNumber({
        action: "filter",
        params: { brand: searchQuery },
      });
    }
    setSearchQuery("");
  };
  return (
    <div>
      <div className={classes.searchInput}>
        <p>Искать по:</p>
        <MySelect
          name="searchFor"
          value={inputForSearch}
          onChange={setInputForSearch}
          options={[
            { value: "product", name: "Название" },
            { value: "price", name: "Цена" },
            { value: "brand", name: "Бренд" },
          ]}
        />
        <MyInput
          name="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className={classes.searchButton}>
          <Button
            onClick={() => {
              handlerFilter(inputForSearch, searchQuery);
            }}
            disabled={loading}
          >
            Поиск
          </Button>
        </div>
        <div className={classes.searchLoader}>
          {loading ? <Loader /> : null}
        </div>
      </div>
      <table className={classes.table}>
        <thead>
          <ItemsHeader />
        </thead>
        <tbody>
          <ItemsRow arrItem={arrItem} />
        </tbody>
      </table>
      <div className={classes.paginationButton}>
        <Button onClick={() => handlePageClick(-50)} disabled={loading}>
          Назад
        </Button>
        <Button onClick={() => handlePageClick(50)} disabled={loading}>
          Вперед
        </Button>
      </div>
    </div>
  );
}
