import styles from "./Search.module.scss";
import { Params, useParams } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetState, search } from "../../redux/actions/search";
import MainTitle from "../../components/MainTitle/MainTitle";
import Grid from "../../components/Grid/Grid";
import SearchSuggestions from "../../components/SearchSuggestions/SearchSuggestions";

export interface ISearchParams {
  limit: number;
  offset: number;
  type: "gifs" | "stickers";
  term: string;
}

export default function Search() {
  const { term }: Params = useParams();

  const searchResults = useSelector((state: RootStateOrAny) => state.search);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState<ISearchParams>({
    term: term as string,
    type: "gifs",
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    dispatch(search({ ...searchParams }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchParams((prevState: any) => ({
      ...prevState,
      offset: 0,
      term,
    }));
  }, [term, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, term]);

  return (
    <main className={styles.container}>
      <MainTitle title={term as string} />
      <SearchSuggestions term={term as string} />
      <Grid
        items={searchResults.results}
        pagination={searchResults.pagination}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        key={term as string}
        term={term as string}
      />
    </main>
  );
}
