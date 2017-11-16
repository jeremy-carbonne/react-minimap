import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'
import Child from './components/Child'
import './react-minimap.css'

export class Minimap extends React.Component {
  static propTypes = {
    identifier: PropTypes.string.isRequired,
    width: PropTypes.number, /** in pixel */
    height: PropTypes.number, /** in pixel */
    keepAspectRatio: PropTypes.bool,
    childComponent: PropTypes.any,
    onMountCenterOnX: PropTypes.bool,
    onMountCenterOnY: PropTypes.bool,
  };

  static defaultProps = {
    width: 200,
    height: 200,
    keepAspectRatio: false,
    childComponent: Child,
    onMountCenterOnX: false,
    onMountCenterOnY: false,
  };

  constructor(props) {
    super(props);
    this.down = this.down.bind(this)
    this.move = this.move.bind(this)
    this.synchronize = this.synchronize.bind(this)
    this.init = this.init.bind(this)
    this.up = this.up.bind(this)

    this.resize = _.throttle(this.synchronize, 100)

    this.state = {
      children: null,
      viewport: null,
      width: props.width,
      height: props.height,
    };

    this.downState = false
    this.initState = false
  }
  
  componentDidMount() {
    const {onMountCenterOnX, onMountCenterOnY} = this.props
    setTimeout(() => this.synchronize({centerOnX: onMountCenterOnX, centerOnY:onMountCenterOnY}));
    window.addEventListener( "resize", this.resize);
    this.init()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keepAspectRatio !== this.props.keepAspectRatio)
      setTimeout(this.synchronize);
  }

  componentDidUpdate() {
    if (this.initState) {
      this.initState = false
    } else {
      this.initState = true
      this.init()
    }
  }

  init() {
    const {childComponent, keepAspectRatio} = this.props
    const ChildComponent = childComponent
    const {scrollWidth, scrollHeight, scrollTop, scrollLeft} = this.source
    const sourceRect = this.source.getBoundingClientRect()

    let {width, height} = this.props


    let ratioX = width / scrollWidth;
    let ratioY = height / scrollHeight;
    
    if (keepAspectRatio) {
      if (ratioX < ratioY) {
        ratioY = ratioX
        height = Math.round( scrollHeight / (scrollWidth / width) )
      } else {
        ratioX = ratioY
        width = Math.round( scrollWidth / (scrollHeight / height) )
      }
    }

    const nodes = this.ref.querySelectorAll(this.props.identifier)
    this.setState({
      ...this.state,
      height,
      width,
      children: _.map(nodes, (node, key) => {
        const {width, height, left, top} = node.getBoundingClientRect()

        const wM = width * ratioX;
        const hM = height * ratioY;
        const xM = (left + scrollLeft - sourceRect.left) * ratioX;
        const yM = (top + scrollTop - sourceRect.top) * ratioY;

        return (
          <ChildComponent
            key={key}
            width={Math.round( wM )}
            height={Math.round( hM )}
            left={Math.round( xM )}
            top={Math.round( yM )}
            node={node}
          />
        )
      })
    })
  }

  down( e ) {
    const pos = this.minimap.getBoundingClientRect()

    this.x = Math.round( pos.left + this.l + this.w / 2 );
    this.y = Math.round( pos.top + this.t + this.h / 2 );

    this.downState = true
    this.move( e );
  }

  up() {
    this.downState = false
  }

  move( e ) {
    if (this.downState === false)
      return

    const {width, height} = this.state
    let event;

    e.preventDefault();
    if ( e.type.match( /touch/ ) ) {
      if ( e.touches.length > 1 ) {
        return;
      }
      event = e.touches[ 0 ];
    } else {
      event = e;
    }

    let dx = event.clientX - this.x;
    let dy = event.clientY - this.y;
    if ( this.l + dx < 0 ) {
      dx = -this.l;
    }
    if ( this.t + dy < 0 ) {
      dy = -this.t;
    }
    if ( this.l + this.w + dx > width ) {
      dx = width - this.l - this.w;
    }
    if ( this.t + this.h + dy > height ) {
      dy = height - this.t - this.h;
    }

    this.x += dx;
    this.y += dy;

    this.l += dx;
    this.t += dy;

    const coefX = width / this.source.scrollWidth;
    const coefY = height / this.source.scrollHeight;
    const left = this.l / coefX;
    const top = this.t / coefY;

    
    this.source.scrollLeft = Math.round( left );
    this.source.scrollTop = Math.round( top );
    this.redraw();
  }

  synchronize(options) {
    const {width, height} = this.state

    const rect = this.source.getBoundingClientRect()

    const dims = [ rect.width, rect.height ];
    const scroll = [ this.source.scrollLeft, this.source.scrollTop ];
    const scaleX = width / this.source.scrollWidth;
    const scaleY = height / this.source.scrollHeight;

    const lW = dims[ 0 ] * scaleX;
    const lH = dims[ 1 ] * scaleY;
    const lX = scroll[ 0 ] * scaleX;
    const lY = scroll[ 1 ] * scaleY;

    this.w = Math.round( lW );
    this.h = Math.round( lH );
    this.l = Math.round( lX );
    this.t = Math.round( lY );

    if (options !== undefined) {
      if (options.centerOnX === true) {
        this.source.scrollLeft  = this.source.scrollWidth / 2 - dims[ 0 ]  / 2
      }

      if (options.centerOnY === true) {
        this.source.scrollTop  = this.source.scrollHeight / 2 - dims[ 1 ]  / 2
      }
    }

    this.redraw();
  }

  redraw() {
    this.setState({
      ...this.state, 
      viewport: (
        <div 
          className="minimap-viewport" 
          style={{
            width : this.w,
            height : this.h,
            left : this.l,
            top : this.t      
          }}
        />
      )
    })
  }


  render() {
    const {width, height} = this.state

    return (  
      <div 
        className="minimap-container"
        onScroll={this.synchronize} 
        ref={(source) => {this.source = source;}}
      >
        <div 
          className="minimap"
          style={{            
            width: `${width}px`, 
            height: `${height}px`,
          }}
          
          ref={(minimap) => { this.minimap = minimap; }} 

          onMouseDown={this.down} 
          onTouchStart={this.down} 
          onTouchMove={this.move}
          onMouseMove={this.move}
          onTouchEnd={this.up}
          onMouseUp={this.up}
        >
          {this.state.viewport}
          {this.state.children}
        </div>

        <div ref={(container) => { this.ref = container; }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Minimap
