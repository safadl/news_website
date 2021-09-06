import Loader from "react-loader-spinner";

const LoaderComp=()=>{
  return(
    <Loader
    style={{alignSelf: 'center'}}
        type="Circles"
        color="#87CEEB"
        height={50}
        width={50}
        timeout={3000} //3 secs
      />   
  )  
}
export default LoaderComp;