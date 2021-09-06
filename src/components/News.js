import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LoaderComp from "./LoaderComp";
import '../App.css'
import {
 
  KeyboardDatePicker,
} from '@material-ui/pickers';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [langues, setLangues] = useState("");
  const [loading, setLoader] = useState(true);
  const [type, setType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState('2021-08-18');
  const [selectedEndDate, setSelectedEndDate] = useState('2021-08-18');

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=general&language=" +
          langues +
          "&sortBy=" +
          type +
          "&from="+selectedStartDate+"&to="+selectedEndDate+"&pageSize=100&apiKey=22fd860715af4f7ca4c8de363d8dc363"
      )
      .then((res) => {
        console.log("ARTICLES " + res.data.articles);
        setLoader(false);
        setArticles(res.data.articles);
      })

      .catch((err) => console.log(err));
  }, [langues, type,selectedStartDate,selectedEndDate]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {},
    media: {
      height: 250,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginBottom: 50,
    },
  }));
  const classes = useStyles();

  const handleChange = (event) => {
    const lg = event.target.value;
    const type = event.target.value;
    setLangues(lg);
    setType(type);
  };

  const handleChangeType = (event) => {
    const type = event.target.value;
    setType(type);
  };

  const handleDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <div className={classes.root}>
      <div className='forms' style={{justifyContent: 'space-between',display: 'flex'}}>
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
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="From"
          value={selectedStartDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="To"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </div>
      {loading ? (
        <div
          style={{
            alignItems: "center",
            flex: 1,
            marginTop: 100,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <p>Loading articles...</p>
          <LoaderComp />
        </div>
      ) : null}
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
    </div>
  );
};
export default News;
