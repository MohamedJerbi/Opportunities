import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Card from "./Components/Card/Card";
import './App.css';


export default class App extends React.Component {
	constructor(){
	super();
	this.state={
	hasError:false,
	data:[],
	perPage:10,
	page:1,
	totalPages:null,
	scroll:false,
	oppNumber:null}
	}
//function that fetches the data from AIESECGIS API using the given access_token and the paging parameters with state
  fetchData=() =>{
    fetch(`https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&page=${this.state.page}&per_page=${this.state.perPage}`)
	  .then(res=>res.json())
      .then(res => this.setState({data:[...this.state.data,...res.data],
	  scroll:false,totalPages:res.paging.total_pages,oppNumber:res.paging.total_items
	  }))
      .catch(err => this.setState({Errors:err}));
  }
	componentWillMount(){
this.fetchData();
  this.scrollListener = window.addEventListener('scroll', (e) => {
  this.handleScroll(e);
  })
  }
  //function that check the current position on the page scroll used to trigger the loadMore funtion
  handleScroll=(e)=>{
  const {page,scroll,totalPages} = this.state;
  if(scroll) return;
  if(totalPages <= page) return;
 if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight/100*75)) this.loadMore();
  }
  //function that changes the current page state to the next page and wait for the call back fetchdata to fetch the new page data
  loadMore =()=>{
this.setState(prevState => ({page:prevState.page+1,scroll:true}),()=>this.fetchData());
}
  componentWillUnmount() {
       this.fetchData();
    }
  render(){
const {hasError,data,page,scroll} = this.state;
console.log(page);
console.log(data);
  return (
    <div className="App">
     <Navigation scroll={this.state.scroll}/>
	 <p style={{padding:"2vh"}} />
	  {data[0]?data.map((p,k)=>{
	  let name;
	  //making sure to avoidundefined error in case of that the branc/organisation doesn't are undefined or null
	  if(p.branch && p.branch.organisation.name) name=p.branch.organisation.name;else  name="";
	  return <Card date={p.earliest_start_date} location={p.location} duration={p.duration} title={p.title} company={name} 
	  applicants_count={p.applications_count} letter={p.profile_photo_urls.original} product={p.programmes.short_name} oppUrl={p.id} key={k} />
	  }):"Loading"}
      <hr />
	  {hasError?<span>Has error: {JSON.stringify(hasError)}</span>:null}
	  {scroll?<p>loading</p>:null}
    </div>
  );
}
}

