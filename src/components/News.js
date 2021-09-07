import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LoaderComp from "./LoaderComp";
import "../App.css";
import "../styles/articles.css";

import { KeyboardDatePicker } from "@material-ui/pickers";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [langues, setLangues] = useState("");
  const [loading, setLoader] = useState(true);
  const [type, setType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("2021-09-01");
  const [selectedEndDate, setSelectedEndDate] = useState("2021-09-06");

  useEffect(() => {
    //get Data
    axios
      .get(
        "https://newsapi.org/v2/everything?q=general&language=" +
          langues +
          "&sortBy=" +
          type +
          "&from=" +
          selectedStartDate +
          "&to=" +
          selectedEndDate +
          "&pageSize=100&apiKey=22fd860715af4f7ca4c8de363d8dc363"
      )
      .then((res) => {
        setLoader(false); // loader is disabled
        setArticles(res.data.articles);
        console.log(
          "OUR API NOW " +
            "https://newsapi.org/v2/everything?q=general&language=" +
            langues +
            "&sortBy=" +
            type +
            "&from=" +
            selectedStartDate +
            "&to=" +
            selectedEndDate +
            "&pageSize=100&apiKey=22fd860715af4f7ca4c8de363d8dc363"
        );
      })

      .catch((err) => console.log(err));
  }, [langues, type, selectedStartDate, selectedEndDate]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();

  // get chosen language
  const handleChange = (event) => {
    const lg = event.target.value;
    setLangues(lg);
  };

  // get chosen type (relevancy,popularity or publishedAt)
  const handleChangeType = (event) => {
    const type = event.target.value;
    setType(type);
  };

  //get chosen start date
  const handleDateStartChange = (date) => {
    const fullDate = [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      date.getDate(),
    ].join("-");
    setSelectedStartDate(fullDate);
  };

  //get chosen end date
  const handleEndDateChange = (date) => {
    const fullDate = [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      date.getDate(),
    ].join("-");
    setSelectedEndDate(fullDate);
  };

  return (
    <div className={classes.root}>
      <h1>BREAKING NEWS</h1>
      <div className="forms">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple" width="200px">
            Language
          </InputLabel>
          <Select native onChange={handleChange} value={langues}>
            <option aria-label="None" value="" />
            <option value={"ar"}>AR</option>
            <option value={"de"}>DE</option>
            <option value={"fr"}>FR</option>
            <option value={"he"}>HE</option>
            <option value={"it"}>IT</option>
            <option value={"nl"}>NL</option>
            <option value={"pt"}>PT</option>
            <option value={"ru"}>RU</option>
            <option value={"se"}>SE</option>
            <option value={"ud"}>UD</option>
            <option value={"zh"}>ZH</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple" width="200px">
            Type
          </InputLabel>
          <Select native onChange={handleChangeType} value={type}>
            <option aria-label="None" value="" />
            <option value={"popularity"}>Popularite</option>
            <option value={"relevancy"}>Pertinence</option>
            <option value={"publishedAt"}>Date</option>
          </Select>
        </FormControl>

        <KeyboardDatePicker
          autoOk={true}
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline1"
          maxDate={Date.now()}
          label="From"
          value={selectedStartDate}
          onChange={handleDateStartChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          maxDate={Date.now()}
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="To"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading articles...</p>
          <LoaderComp />
        </div>
      ) : (
        <Grid container spacing={4}>
          {articles.map(function (item, index) {
            return (
              <NewsCard
                key={index}
                publishedAt={item.publishedAt}
                url={item.url}
                title={item.title}
                urlToImage={item.urlToImage}
                author={item.author}
                sourceName={item.source.name}
                description={item.description}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
};
export default News;
