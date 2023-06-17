import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import GamesBar from "../GamesBar/GamesBar";
import { getPostsWithPagination, createPost } from "../../Redux/actions";
import Loader from "../Loader/Loader";

const GamePosts = () => {
  const location = useLocation();
  const { gameId, gameModeId } = queryString.parse(location.search);
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const stateUser = useSelector((state) => state.user);
  console.log(stateUser);



//------------------esto es para el form------------------------------//
  const [userId, setUserId] = useState(stateUser.id);
  const [text, setText] = useState("");
  const [gameid, setGameid] = useState(gameId);
  const [gamemodeid, setGamemodeid] = useState(gameModeId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(createPost({ text, userid: userId, gameid, gamemodeid }))

      if (response.ok) {
        // El post se creó exitosamente, puedes realizar alguna acción aquí si es necesario
        console.log("El post se creó exitosamente");
      } else {
        // Hubo un error al crear el post, puedes manejarlo de acuerdo a tus necesidades
        console.error("Error al crear el post");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setText("");
  };

//----------posts con paginacion------------------//
//-------constantes y estados-----
const [currentPage, setCurrentPage]=useState(1)
const [btnNext, setBtnNext]=useState(false)
const [btnPrev, setBtnPrev]=useState(true)
const [loading, setLoading]=useState(true)

const post=useSelector(state=>state.pagePosts)
const pagedPosts=post.posts

//----modificacion de estados----///
useEffect(()=>{
  setLoading(true)
  dispatch(getPostsWithPagination(currentPage, gameid, gamemodeid))
  .then(()=>setLoading(false))
}, [currentPage, dispatch, post])


useEffect(()=>{
  if(currentPage === 1){
    setBtnNext(true);
    setBtnPrev(false)
}else if(currentPage === post.totalPages){
    setBtnNext(true)
    setBtnPrev(false)
}else{
    setBtnNext(false)
    setBtnPrev(false)
}
})

const pages=Array.from({ length: post.totalPages }, (_, index) => index + 1)

const handleOnClick= (event)=>{
  const selectedPage=parseInt(event.target.value)
  if(selectedPage !== currentPage){
      const newIndex = (selectedPage-1)*
      setCurrentPage(selectedPage)

  }
}
const handleNext = (event)=>{
  if(currentPage !== post.totalPages){
    const nextPage=currentPage+1;
    setCurrentPage(nextPage)
  }
}

const handlePrev = ()=>{
  if(currentPage>1){
    const prevPage=currentPage-1;
    setCurrentPage(prevPage)
}
}

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <GamesBar/>
      <div>
      <form style={{marginTop:'0.75em'}} onSubmit={handleSubmit}>
        <input
          style={{width:'35rem', height:'5em', marginLeft:'5em', borderColor:'crimson', borderWidth:'2px'}}
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ingrese el texto del post"
        />
        <button style={{marginLeft:'.75em'}} type="submit">Crear Post</button>
      </form>
      <button onClick={handlePrev} >Prev Posts</button>
      {pages?.map(e=><button style={{marginLeft:'5px', marginRight:'5px'}} key={e} value={e} onClick={handleOnClick} disabled={currentPage===e}>{e}</button>)}
      <button onClick={handleNext} >Next Posts</button>
      <div>
      {pagedPosts?.map(({id, createdAt, text, User})=>{
        return(
          <div key={id} style={{width:'40rem', marginLeft:'5em', marginTop:'.5em', height:'6em', borderColor:'crimson', borderWidth:'2px'}}>
            <h1>{text}</h1>
            <p>Posted by:</p>
            {/* {currentId === User.id && <button onClick={()=>navigate(`/profile/${User.id}`)}>{User?.name}</button>} */}
            <p>Created: {createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
          </div>
        )
      })}
      </div>
      </div>

    </div>
  );
};

export default GamePosts;
