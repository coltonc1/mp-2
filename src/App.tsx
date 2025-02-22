import TvShowSearchResult from "./components/TvShowSearch.tsx";
import {useState} from "react";
import {TvShowInfo} from "./interfaces/TvShowInfo.ts";
import styled from "styled-components";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 10px black solid;
`;

const StyledInput=styled.input`
  margin: 2% 2%;
  height: 50px;
  width: 50%;
  font-size: 25px;
`;

const StyledButton=styled.button`
  margin-left: 2%;
  padding: 10px 20px;
  font-size: 25px;
`;

export default function App() {


  const [data, setData] = useState<TvShowInfo[]>([]);
  const[search, setSearch] = useState("breaking bad");


  function ApiCall() {
    async function fetchData(): Promise<void> {
      const res = await fetch(`http://api.tvmaze.com/search/shows?q=${search}`);
      const resJson = await res.json();
      setData(resJson);
      
    }
    fetchData()
        .then(() => console.log("Data fetched successfully"))
        .catch((e: Error) => console.log("There was the error: " + e));
  }


  return(
    <>
    <ParentDiv>
      <StyledInput 
        type="text" 
        placeholder="Search for a TV show" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <StyledButton onClick={ApiCall}>Search</StyledButton>

      <TvShowSearchResult data={data} />
    </ParentDiv>
    </>
  );
}