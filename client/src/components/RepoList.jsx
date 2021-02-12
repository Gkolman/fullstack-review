import React from 'react';

const RepoList = (props) => {
  console.log('props -> ', props)

  var getReadableDate = (date) => {
    var time = date.toString()
    var split = time.split('')
    split.splice(4,0,':')
    split.splice(7,0,':')
    split.splice(10,0,' at ')
    split.splice(13,0,':')
    split.splice(16,0,':')
   return split.join('')
  }

  var reposInDb = props.repos.map((repo) => {
    return (
    <tr>
      <td> {repo.repoId} </td>
      <td> {repo.name}</td>
      <td> {repo.description} </td>
      <td> {repo.username}</td>
      <td> {getReadableDate(repo.createdAt)}</td>
      <a href = {repo.repolink} > show me on github </a>
      {/* <td> {repo.repolink}</td> */}
    </tr>
    )
  })

   return <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos in database.
      <table>
        <thead>
          <tr>
            <th> repo id </th>
            <th> repo name  </th>
            <th> description </th>
            <th> created by </th>
            <th> created at </th>
            <th> repo link </th>
          </tr>
        </thead>
        <tbody>
          {reposInDb}
        </tbody>
      </table>
    </div>

}
export default RepoList;