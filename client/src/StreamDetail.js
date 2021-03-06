import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import "./StreamDetail.css";

const style = {
  height: "auto",
  width: "100%",
  margin: 20,
  display: "inline-block",
  padding: 20
};

const MovieDetail = class extends Component {
  render() {
    // TODO: make api call if streams is empty
    const stream = this.props.streams[this.props.match.params.id];

    const torrents = Object.keys(stream.torrents.en).map(quality => (
      <div>
        {quality}: <a href={stream.torrents.en[quality].url}> magnetic link</a>
      </div>
    ));

    const genres = stream.genres.map(genre => <span>#{genre} </span>);
    return (
      <Paper style={style} zDepth={3} rounded={false}>
        <div className="stream-detail">
          <img className="poster" src={stream.images.fanart} alt="" />
          <h3>
            {stream.title} ({stream.year})
          </h3>
          <div>Rating: {stream.rating.percentage}%</div>
          {genres}
          <div>Runtime: {stream.runtime} minutes</div>
          <div>{stream.synopsis}</div>
          <hr />
          <a href={stream.trailer}>Play trailer</a>
          {torrents}
        </div>
      </Paper>
    );
  }
};

function mapStateToProps(state) {
  return {
    streams: state.page.streams
  };
}

export default connect(mapStateToProps)(MovieDetail);
