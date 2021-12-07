import React, { useEffect, useState } from "react";
import {Bar} from "react-chartjs-3";
import "./static/ScoreChart.css";

const ScoreChart = function({highScores}) {

    console.log(highScores); // testing

    const [topFive, setTopFive] = useState([]);

    useEffect(() => {
        if (highScores !== []) {
            console.log("high score loop entered")
            setTopFive(highScores.slice(0, 5));
            getData();
        }
    }, [highScores]);

    const getData = function() {
        const data = {
            labels: [],
            datasets: [
              {
                label: 'Top 5 High Scores',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: []
              }
            ]
        };
        // set labels
        let tempLabelsArray = [];
        for (let data of topFive) {
            tempLabelsArray.push(data.player_name);
        }
        data.labels = tempLabelsArray;
        // set data
        const tempDataArray = [];
        for (let data of topFive) {
            tempDataArray.push(data.score)
        }
        data.datasets[0].data = tempDataArray;
        return data;
    }

    return(
        <div>
            {topFive !== [] ?
            <>
                <h2>Top 5 Players</h2>
                <div className="bar-chart">
                    <Bar 
                        data={getData}
                        // width="100vw"
                        // height="50vh"
                        options={{
                        maintainAspectRatio: false        
                        }}
                    />
                </div>
            </>
            : null}
        </div>
    )
}

export default ScoreChart;
