import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const NewsCard = (props)=>{

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
    
        },
       
        media: {
          height: 250,
        },
        
      }));
      const classes = useStyles();

    return(
  
        <Grid item  xs={12} md={6} sm={6} lg={6} >
          <Card className={classes.root}>
      <CardActionArea onClick={()=>window.open(props.url, "_blank")} >
        <CardMedia
          className={classes.media}
          image={props.urlToImage?props.urlToImage:'https://www.andromo.com/wp-content/uploads/2020/12/news-1.jpg'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="body2" component="h2">
            {props.author? 'By: '+props.author : null}
          </Typography>
          <Typography color='error' gutterBottom variant="body2" component="h3">
            {props.sourceName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
          </Typography>
          <Typography variant="body2"  style={{textAlign:'center',color:'green',marginTop:20}} component="p">
          {props.publishedAt.substring(0, 10)} at {props.publishedAt.substring(12, 16)}
          
          </Typography>
        </CardContent>
      </CardActionArea>

      
    </Card>
        </Grid>
        
 
     
    )
}
export default NewsCard;