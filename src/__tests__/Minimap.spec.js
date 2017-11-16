import React from 'react'
import Minimap from '../react-minimap'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('Minimap', () => {

  it('should mount without any warning', () => {
    // react writes to console.error on a PropType error :(
    const errors = []
    sinon.stub(console, 'error').callsFake(error => {
      errors.push(error)
    })

    render(
      <div>
        <Minimap selector=".subject">
          <ul>
            <li>Hello <span className="subject">Minimap</span></li>
            <li>Hello <span className="subject">World</span></li>
            <li>Hello <span className="subject">Blah</span></li>
          </ul>
        </Minimap>
      </div>
    )
    expect(errors).toEqual([])
  })
  
})