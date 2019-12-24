import React from 'react';

const RepoList = (props) => (
  <div>
  <h4> Repo List Component </h4>
  {props.repos.map(repo => <RepoSingle repo = {repo} key ={repo.id} />)}
</div>
)
const RepoSingle = (props) => (
 <div>
   <h5> <a href={props.repo.html_url}> {props.repo.name} </a> </h5>
   <div> Creator: {props.repo.owner.login}</div>
   <div> Fork Count: {props.repo.forks_count}</div>
 </div>
)
export default RepoList;