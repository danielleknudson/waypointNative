var React = require('react-native');
var styles = require('./browse.styles.js');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var Detail = require('./Detail/detail.index.js');

class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  }

  componentDidMount() {
    var paths = [
        {title: 'Seaside Bike Ride', numWaypoints: '0', length: '23 miles', estimated_time: '45 minutes', creator: "DK", description: 'Pleasant bike ride along ocean beach in SF. Pray for sun or else it might not be so pleasant!', start: {latitude: '37.783872', longitude: '-122.411277'}},
        {title: 'Pub Crawl', numWaypoints: '5', length: '1.25 miles', estimated_time: '4 hours', creator: "DK", description: 'Hope you\'re thirsty', start: {latitude: '37.783872', longitude: '-122.411277'}},
        {title: 'SF Tour', numWaypoints: '9', length: '8 miles', estimated_time: '3 hours', creator: "DK", description: 'Tour of San Francisco. Includes audio commentary, pleasant and gross smells, lovely and ugly views, and much, much, more. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', start: {latitude: '37.783872', longitude: '-122.411277'}},
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(paths)
    });
  }

  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderPath.bind(this)}/>
    )
  }

  renderPath(path) {
    console.log(path);
    var description = '';
    if (path.description.length >= 100) {
      description = path.description.substring(0, 105) + '...';
    } else {
      description = path.description;
    }

    return (
      <TouchableHighlight style={styles.item}
        onPress={this.renderDetailView.bind(this, path)}
        underlayColor={'#FFFFFF'}>
        <View>
          <Text style={styles.title}>{path.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            {path.numWaypoints} stops - {path.length} - {path.estimated_time}</Text>
          </View>
          <View>  
            <Text style={styles.description}> 
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderDetailView(path) {
    console.log(path);
    // "push a new view"
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: path.title,
      component: Detail,
      passProps: { details: path }
    })
  }
}

module.exports = Browse;