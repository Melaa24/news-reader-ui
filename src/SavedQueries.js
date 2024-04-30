import { cannedQueries } from './data';

export function SavedQueries(params) {
  
    function onSavedQueryClick(savedQuery){
      params.onQuerySelect(savedQuery);
    }

    function currentUser() {
      if (params.currentUser) {
        return true;
      }
      return false;
    }

    function currentUserIsAdmin() {
      if (params.currentUser) {
          if (params.currentUser.user) {
              if (params.currentUser.user === "admin") {
                  return true;
              }
          }
      }
      return false;
    }

    async function resetQueries(){
      let deleteQueries = "./queries"
      if (window.confirm('Are you sure you want to delete all saved queires?')) {
        try {
          const response = await fetch(deleteQueries, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
          if (response.ok) {
            alert("Saved queries have been reset")
            params.setSavedQueries([])
          }
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      } else {
        alert("No saved queries have been removed.")
      }
    }
  
    function getQueries() {
      return params.savedQueries.map((item, idx) => {
        let trimTitle = item.queryName.substring(0, 30);
        if (currentUserIsAdmin()) {
          return (<li 
            key={idx} 
            onClick={()=>onSavedQueryClick(item)} 
            className={(item.queryName === params.selectedQueryName)?"selected":""}>
            {"NAME: " + trimTitle}<br />
            {"KEY WORD: " + item.q}<br />
            {"LANGUAGE: " + item.language}<br />
            {"PAGE SIZE: " + item.pageSize}</li>)
        } else {
          return (<li 
            key={idx} 
            onClick={()=>onSavedQueryClick(item)} 
            className={(item.queryName === params.selectedQueryName)?"selected":""}>
            {"NAME: " + trimTitle}<br />
            {"KEY WORD: " + item.q}<br /></li>);
        }}
      )
    } 

    function getPublicQueries() {
      return cannedQueries.map((item, idx) => {
        let trimTitle = item.queryName.substring(0, 30);
        return (<li 
          key={idx} 
          onClick={()=>onSavedQueryClick(item)} 
          className={(item.queryName === params.selectedQueryName)?"selected":""}
        >{trimTitle + ": \"" + item.q + "\""} </li>);
      })
    } 
  
    return (
      <>
      <div id="scroll" className={currentUser()?"visible":"hidden"}>
        <button onClick={resetQueries} className={"reset"}>Reset Saved Queries</button>
        <ul >{
          (params.savedQueries && params.savedQueries.length > 0)
          ? getQueries()
          : <li>No Saved Queries, Yet!</li>
        }</ul>
      </div>
        <div className={!currentUser()?"visible":"hidden"}>
          <ul>
            {getPublicQueries()}
          </ul>
        </div>
      </> 
      )
    }