import React from 'react';
// import index from '../index.jsx'

const RepoList = (props) => {

const listItems = props.repos.map((repo, index) =>
  <div className="col-md-3" key={index} style={{border: "groove", padding: "20px", margin: "20px"}}>
  <h1>{index+1}</h1>
<p>{repo.userName}</p>
<p>{repo.repoName}</p>
<a href={repo.url} target="_blank">Link</a>
</div>
 );

return (
 <div>
   <h4>Repo List Component</h4>
   There are {props.repos.length} repos.
   <br></br>
   <div className="row">
   {listItems}
  </div>
 </div>
)
}
export default RepoList;
