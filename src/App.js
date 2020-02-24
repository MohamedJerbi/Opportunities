import React from "react";
import Navigation from "./Components/Navigation/Navigation";
import Card from "./Components/Card/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textSearch: "",
      hasError: false,
      data: [],
      perPage: 10,
      page: 1,
      totalPages: null,
      scroll: false,
      oppNumber: null,
      backgrounds: [],
      editOpp: {
        id: "",
        title: "",
        description: "",
        duration: "",
        nationalities: [],
        skills: [],
        backgrounds: [],
        languages: [],
        measure_of_impacts: []
      }
    };
  }
  //function to update textSearch
  updateSearch = textSearch => {
    this.setState(
      prevState => ({ data: [], textSearch }),
      () => this.fetchData()
    );
  };
  //function that update backgrounds filter
  updateBackgrounds = array => {
    const backgrounds = [];
    array.map(p => backgrounds.push(p.id));
    this.setState({ backgrounds });
  };
  //function that fetches the data from AIESECGIS API using the given access_token and the paging parameters with state
  fetchData = () => {
    fetch(
      `https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&page=${this.state.page}&per_page=${this.state.perPage}&q=${this.state.textSearch}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: [...this.state.data, ...res.data],
          scroll: false,
          totalPages: res.paging.total_pages,
          oppNumber: res.paging.total_items
        })
      )
      .catch(err => this.setState({ Errors: err }));
  };
  //fetch specific opportunity data
  fetchOpp = id => {
    return fetch(
      `https://api-staging.aiesec.org/v2/opportunities/${id}?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
    )
      .then(res => res.json())
      .then(res => this.setState({ editOpp: res }))
      .catch(err => this.setState({ Errors: err }));
  };
  //update opportunity function
  updateData = (
    id,
    title,
    description,
    duration,
    nationalities,
    skills,
    backgrounds,
    languages,
    measure_of_impacts
  ) => {
    fetch(
      "https://api-staging.aiesec.org/v2/opportunities/9429?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
          opportunity: {
            id: id,
            title: title,
            description: description,
            duration: duration,
            nationalities: nationalities,
            skills: skills,
            backgrounds: backgrounds,
            languages: languages,
            measure_of_impacts: measure_of_impacts
          }
        })
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        alert(data.id ? "Opportunity Added Succefully" : "Error Occured");
      })
      .catch(e => alert("Error Occured"));
  };

  componentWillMount() {
    // this.updateData();
    this.fetchData();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }
  //function that check the current position on the page scroll used to trigger the loadMore funtion
  handleScroll = e => {
    const { page, scroll, totalPages } = this.state;
    if (scroll) return;
    if (totalPages <= page) return;
    if (
      window.innerHeight + window.scrollY >=
      (document.body.offsetHeight / 100) * 75
    )
      this.loadMore();
  };
  //function that changes the current page state to the next page and wait for the call back fetchdata to fetch the new page data
  loadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, scroll: true }),
      () => this.fetchData()
    );
  };
  componentWillUnmount() {
    this.fetchData();
  }
  render() {
    console.log(this.state.oppNumber);
    const { hasError, data, page, scroll } = this.state;
    console.log(page);
    console.log(data);
    console.log(this.state.backgrounds);
    return (
      <div className="App">
        <Navigation
          data={this.state.textSearch}
          updateSearch={this.updateSearch}
          updateBackgrounds={this.updateBackgrounds}
        />
        <p style={{ padding: "2vh" }} />
        {data[0] ? (
          data.map((p, k) => {
            let name;
            //making sure to avoidundefined error in case of that the branc/organisation doesn't are undefined or null
            if (p.branch && p.branch.organisation.name)
              name = p.branch.organisation.name;
            else name = "";
            return (
              <Card
                idd={p.id}
                fetchOpp={this.fetchOpp}
                data={this.state.editOpp}
                updateData={this.updateData}
                date={p.earliest_start_date}
                location={p.location}
                duration={p.duration}
                title={p.title}
                company={name}
                applicants_count={p.applications_count}
                letter={p.profile_photo_urls.original}
                product={p.programmes.short_name}
                oppUrl={p.id}
                key={k}
              />
            );
          })
        ) : (
          <div className="scroll">
            <CircularProgress />
          </div>
        )}
        <hr />
        {hasError ? <span>Has error: {JSON.stringify(hasError)}</span> : null}
        {scroll ? (
          <div className="scroll">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
}
