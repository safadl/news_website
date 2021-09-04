import {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
function App() {
  const [articles, setArticles]=useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // maxWidth: 345,

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
   
    media: {
      height: 140,
    },
  }));
  useEffect(() => {
    //fetch villes metropolitaines
    axios
      .get('https://newsapi.org/v2/everything?q=general&pageSize=100&apiKey=22fd860715af4f7ca4c8de363d8dc363')
      .then((res) => {
        console.log('ARTICLES '+res.data.articles)
        // setMetr(res.data.articles);
        // setSearched(res.data);
        // setLoading(false);
        setArticles(res.data.articles)
      })

      .catch((err) => console.log(err));
    //fetch villes d'outre mer
 
  }, []);
  
  const classes = useStyles();
 const onClick=(url)=>{
    window.location.href=url;
}

  return (
    <div className="App">
        {/* <ul>
    {articles.map(function(item,index) {
      return <li key={index++}>{item.author}</li>;
    })}
  </ul> */}
  <div className={classes.root}>
      <Grid container spacing={4}>
      {articles.map(function(item,index) {
      return (
        <Grid item xs={4}>
          <Card className={classes.root}>
      <CardActionArea onClick={()=>window.open(item.url, "_blank")} >
        <CardMedia
          className={classes.media}
          image={item.urlToImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="body2" component="h2">
            {item.author? 'By: '+item.author : null}
          </Typography>
          <Typography color='error' gutterBottom variant="body2" component="h3">
            {item.source.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>

        <Button size="small" color="primary" onClick={()=>onClick(item.url)} blank>
          Read Article
        </Button>
        
      </CardActions> */}
      
    </Card>
        </Grid>
        );
    })}
       
      </Grid>
     
    </div>
    </div>
  );
}

export default App;





