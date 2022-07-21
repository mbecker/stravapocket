import classNames from "classnames";
import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { Activities, Activity } from "../common/Strava";

import RefreshButton from "../components/RefreshButton";
import SearchBar from "../components/Searchbar";
import StravaRow from "../components/strava/row";
import { PocketBaseContext } from "../lib/PocketBaseProvider";

type Sorting = "asc" | "desc" | null;
const ASC = "asc";
const DESC = "desc";

interface TableOptions {
  activity: Sorting;
  name: Sorting;
  distance: Sorting;
  duration: Sorting;
  startdate: Sorting;
  map: boolean;
}

const TABLEOPTIONS = {
  activity: null,
  name: null,
  distance: null,
  duration: null,
  startdate: null,
  map: true,
};

const Home: NextPage = () => {
  const { pocketBaseClient } = useContext(PocketBaseContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<Activities>([]);

  const [tableOptions, setTableOptions] = useState<TableOptions>(TABLEOPTIONS);

  const fetchData = useCallback(async () => {
    const data = (await pocketBaseClient.send(
      "/api/strava/activities",
      {}
    )) as Activities;
    let print = false;
    data.forEach((a) => {
      if (!print) {
        if (a.map.summary_polyline.length > 1) {
          console.log(JSON.stringify(a.map, undefined, 2));
          print = false;
        }
      }
    });
    // console.log(JSON.stringify(data[0], undefined, 2));
    setRows(data);
  }, [pocketBaseClient]);

  useEffect(() => {
    if (isLoading === false) return;
    fetchData()
      .then(() => setIsLoading(false))
      // make sure to catch any error
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [fetchData, isLoading]);

  useEffect(() => {
    const rows = 
  }, [tableOptions])

  return (
    <main className="page-wrapper">
      <header className="page-header">
        <nav className="breadcrumbs">
          <div className="breadcrumb-item">Activities</div>
        </nav>

        {/* <button type="button" className="btn btn-secondary btn-circle">
          <i className="ri-settings-4-line" />
        </button> */}

        <RefreshButton
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsLoading(!isLoading);
          }}
        />

        <div className="flex-fill" />
      </header>
      <SearchBar />
      {/* TABLES */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setTableOptions((prevState) => ({
                    ...TABLEOPTIONS,
                    map: prevState.map,
                    activity:
                      prevState.activity === null
                        ? DESC
                        : prevState.activity === DESC
                        ? ASC
                        : null,
                  }));
                }}
                className={classNames(
                  "col-sort col-type-text",
                  {
                    "sort-active sort-desc": tableOptions.activity === DESC,
                  },
                  {
                    "sort-active sort-asc": tableOptions.activity === ASC,
                  }
                )}
              >
                <div className="col-header-content">
                  <span className="txt">activity</span>
                </div>
              </th>

              <th className="col-sort col-type-text">
                <div className="col-header-content">
                  <span className="txt">name</span>
                </div>
              </th>

              <th className="col-sort col-type-text">
                <div className="col-header-content">
                  <span className="txt">distance</span>
                </div>
              </th>

              <th className="col-sort col-type-text">
                <div className="col-header-content">
                  <span className="txt">duration</span>
                </div>
              </th>

              <th className="col-sort col-type-text">
                <div className="col-header-content">
                  <span className="txt">start date</span>
                </div>
              </th>

              <th
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setTableOptions((prevState) => ({
                    ...prevState,
                    map: !prevState.map,
                  }));
                }}
                className={classNames(
                  "col-sort w-[160px] sort-active sort-bool-false",
                  {
                    "sort-bool": tableOptions.map,
                  }
                )}
              >
                <div className="col-header-content">
                  <span className="txt">map</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter((a) => {
                if (tableOptions.map) {
                  return a.map.summary_polyline.length > 0;
                }
                return true;
              })
              .map((k, i) => {
                return <StravaRow key={k.id} activity={k} />;
              })}
          </tbody>
        </table>
      </div>

      <small className="block txt-hint txt-right m-t-sm">
        Showing {rows.length}
      </small>

      <div className="block txt-center m-t-xs">
        <button
          type="button"
          className={classNames("btn btn-lg btn-secondary btn-expanded", {
            "btn-loading": !!isLoading,
          })}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsLoading(!isLoading);
          }}
          // btn-loading btn-disabled
        >
          <span className="txt">Load more 10</span>
        </button>
      </div>
    </main>
  );
};

export default Home;
