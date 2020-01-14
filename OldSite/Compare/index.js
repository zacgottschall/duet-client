import React from 'react';
import Trendex from '../Trendex';
import Era from '../Era';
import GenreChart from '../GenreChart';
import SpiderGraph from '../SpiderGraph';
import Histogram from '../Histogram';
import { useSelector } from 'react-redux';

const Compare = () => { 

  const { trendex, decade, avg_taste, taste, genre_counts } = useSelector((state) => state.user);
  const { 
            trendex: friendTrendex, 
            decade: friendDecade, 
            avg_taste: friend_avg_taste, 
            taste: friendTaste,
            display_name: friendName,
            genre_counts: friendGenre_Counts,
        } = useSelector((state) => state.friend);
  
  return (
    <div className="Compare">
      { taste && trendex && decade && avg_taste && genre_counts 
        && friendTaste && friend_avg_taste && friendTrendex && friendDecade && 
        friendTaste && friendName && friendGenre_Counts &&
        <div className="Compare-content"> 
          <h1 className="Compare-YouAndFriend">You + {friendName}</h1>
          <div className="Compare-Trendexes">
            <Trendex trendex={trendex}/>
            <Trendex friend={friendName.split(" ")[0]} trendex={friendTrendex}/>
          </div>
          <div className="Compare-SpiderGraphAndHistogram">
            <SpiderGraph avg_taste={avg_taste} friendTaste={friend_avg_taste} friendName={friendName.split(" ")[0]}/>
            <Histogram friendTaste={friendTaste} taste={taste} friendName={friendName.split(" ")[0]}/>
          </div> 
          <h2>Do you listen to the same genres?</h2>
          <div className="Compare-GenreCharts">
            <GenreChart genres={genre_counts} height={55}/>
            <GenreChart genres={friendGenre_Counts} height={55}/>
          </div>
          <h2>Were you and {friendName.split(" ")[0]} born in the same decade?</h2>
          <div className="Compare-Eras">   
            <Era decade={decade}/>
            <Era decade={friendDecade} name={friendName.split(" ")[0]}/>
          </div>
          <div className="Footer">
            <div className="DividerLine"/>
            <div className="FooterText">duet©</div>
          </div>  
        </div>
        }
      </div>
  );
};

export default Compare;