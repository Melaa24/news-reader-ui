import './Articles.css';

export function Articles(params) {
    let articles = (params.data.articles)?params.data.articles:[];
    let queryName = (params.query.queryName)?params.query.queryName:"na";
    let queryDetails = (params.query)?params.query:"na";
    let articleCount = (params.data.totalResults)?params.data.totalResults:0;

    function displayQueryDetails(query) {
        function handleClick() {
          if (params.detailsOn) {
            params.setDetailsOn(false)
          } else {
            params.setDetailsOn(true)
          }
        }

        if (params.detailsOn) {
          return (
            <>
              <button onClick={handleClick}>Hide Details</button>
              <ul>
                <li>Subject: {query.q}</li>
                <li>Language: {query.language}</li>
                <li>Page Size: {query.pageSize}</li>
              </ul>
            </> )
        } else {
          return (
            <>
              <button onClick={handleClick}>Show Details</button>
            </>
          )
        }
    };

    return (
      <div className={"scroll"}>
        Query Name: {queryName}
        <br />Query Details: {displayQueryDetails(queryDetails)}
        <br/>Count: {articleCount}
        <ol >{
            articles.map((item, idx) => {
              if(item){
                if(item.title){
                  if(item.title === "[Removed]"){
                    return (<li key={idx} >Was Removed</li>);
                  }
                  return (<li key={idx}><a className={"titleLink"} href={item.url} target="_blank" rel="noreferrer" >{item.title}</a></li>);    
                }else{
                  return (<li key={idx}>No Title</li>);
                }
              }else{
                return (<li key={1} >No Item</li>);
              }
            })
        }</ol>
      </div>
    )
  
  }