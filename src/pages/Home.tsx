import React from 'react';
import { sortList } from '../components/SortPopup';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { filterSelector } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { FilterState } from '../redux/filter/types';
import { pizzasSelector } from '../redux/pizzas/selectors';
import { SearchPizzaParams } from '../redux/pizzas/types';
import { fetchPizzas } from '../redux/pizzas/asyncActions';
import { Categories, PizzaBlock, SortPopup, Skeleton, Pagination } from '../components';

type PizzaObj = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  types: number[];
  rating: number;
  sizes: number[];
};

function Home() {
  const { items, status } = useSelector(pizzasSelector);
  const isSearching = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((item) => item.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          categoryId: Number(params.category),
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        } as FilterState),
      );

      isSearching.current = true;
    }
    isMounted.current = false;

    getPizzas();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj: PizzaObj) => <PizzaBlock {...obj} key={obj.id} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>
            Error in loading <span>😕</span>
          </h2>
          <p>Sorry, please try later</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
