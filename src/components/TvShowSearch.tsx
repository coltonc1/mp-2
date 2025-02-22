import styled from "styled-components";
import {TvShowInfo} from "../interfaces/TvShowInfo.ts";

const AllShowsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: black;
`;

const SingleShowDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: white;
    color: black;
    border: 5px yellow solid;
    text-align: center;
`;

const NoResultsH1=styled.h1`
    color: white;
`;




export default function TvShowSearchResult(props : { data:TvShowInfo[] }) {

    //Needed this to loop over a bunch of times since replaceAll was not supported
    function RemoveHTMLFromString(str: string) {

        for(let i = 0; i < 100; i++) {
            str = str.replace("\u003Cp\u003E", "");
            str = str.replace("\u003C/p\u003E", "");
            str = str.replace("\u003Cb\u003E", "");
            str = str.replace("\u003C/b\u003E", "");
            str = str.replace("\u003Ci\u003E", "");
            str = str.replace("\u003C/i\u003E", "");
        }
        return str;
    }

    if(props.data.length == 0) {
        return(
            <AllShowsDiv>
                <NoResultsH1>No Results</NoResultsH1>
            </AllShowsDiv>
        );
    }

    for(let i = 0; i < props.data.length; i++) {
        if(props.data[i].show == null || props.data[i].show.image == null) {
            props.data.splice(i, 1);
        }
        if(props.data[i].show.id == null) {
            props.data.splice(i, 1);
            i--;
        } else if(props.data[i].show.name == null) {
            props.data.splice(i, 1);
            i--;
        } else if(props.data[i].show.summary == null) {
            props.data.splice(i, 1);
            i--;
        } else if(props.data[i].show.image.medium == null) {
            props.data.splice(i, 1);
            i--;
        }
    }


    return(
        <AllShowsDiv>
            <div>
                {
                     props.data?.map((show: TvShowInfo) =>
                        <SingleShowDiv key={show.show.id}>
                            <h1>{show.show.name}</h1>
                            <img src={show.show.image.medium} alt={`image of ${show.show.name} cover`} />
                            <p>{RemoveHTMLFromString(show.show.summary)}</p>
                        </SingleShowDiv>
                    )
                }
            </div>
        </AllShowsDiv>
    );
}