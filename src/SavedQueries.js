export function SavedQueries(params) {
  
    function onSavedQueryClick(savedQuery){
      params.onQuerySelect(savedQuery);
    }

    async function resetQueries(){
      let deleteQueries = "./queries/reset"
      try {
        const response = await fetch(deleteQueries, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
          alert("Saved queries have been reset")
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  
    function getQueries() {
      return params.savedQueries.map((item, idx) => {
        let trimTitle = item.queryName.substring(0, 30);
        return (<li 
          key={idx} 
          onClick={()=>onSavedQueryClick(item)} 
          className={(item.queryName === params.selectedQueryName)?"selected":""}
        >{trimTitle + ": \"" + item.q + "\""} </li>);
      })
    } 
  
    return (
        <div>
          <ul >{
            (params.savedQueries && params.savedQueries.length > 0)
            ? getQueries()
            : <li>No Saved Queries, Yet!</li>
          }</ul>
          <button onClick={resetQueries}>Reset Saved Queries</button>
        </div>
      )
    
    }