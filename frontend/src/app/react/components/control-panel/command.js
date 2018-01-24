import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Label, SelectList, Spacing, Text, TextField } from 'react-elemental';
import withForm from 'app/react/hoc/with-form';

const ENDPOINTS_TABLE_HEADERS = [
  'Endpoint',
  'Required parameters',
  'Description',
];

/**
 * Interface for sending commands for a specific drone and mission as HTTP requests.
 */
class Command extends Component {
  static propTypes = {
    sendRequest: PropTypes.func.isRequired,
    endpoints: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  handlePanicClick = () => this.props.sendRequest('/_/panic');

  handleRequestClick = () => {
    const { sendRequest, form: { json = '', endpoint } } = this.props;

    sendRequest(endpoint, json && JSON.parse(json));
  };

  render() {
    const { endpoints, handleChange, form: { json = '', endpoint } } = this.props;

    const isEndpointValid = endpoint && endpoint !== 'select-list-placeholder-item-value';
    const isPayloadValid = (() => {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
        return json === '';
      }
    })();

    return (
      <div>
        <Spacing bottom>
          <Spacing size="small" bottom>
            <Text color="primary" secondary bold uppercase>Available endpoints</Text>
          </Spacing>
          <table style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr>
                {ENDPOINTS_TABLE_HEADERS.map((header) => (
                  <td key={header} style={{ verticalAlign: 'top' }}>
                    <Spacing right>
                      <Spacing size="tiny" bottom>
                        <Text size="kilo" color="primary" secondary bold uppercase>
                          {header}
                        </Text>
                      </Spacing>
                    </Spacing>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {endpoints.map(({ description, endpoint: path, required_params: params }) => (
                <tr key={path}>
                  {[path, params.join(', '), description].map((text) => (
                    <td key={text} style={{ verticalAlign: 'top' }}>
                      <Spacing right>
                        <Text size="kilo">{text}</Text>
                      </Spacing>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Spacing>

        <Spacing size="large" bottom>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <Spacing bottom>
              <Text color="primary" secondary bold uppercase>Send command</Text>
            </Spacing>

            <Spacing bottom>
              <Label
                label="Endpoint"
                sublabel="One of the endpoints above for an outgoing request."
              />
              <SelectList
                placeholder="Select an endpoint..."
                width="400px"
                onChange={handleChange('endpoint')}
                options={endpoints.map(({ endpoint: path }) => ({
                  label: path,
                  value: path,
                }))}
                style={{ boxSizing: 'border-box' }}
              />
            </Spacing>

            <Spacing bottom>
              <Label
                label="JSON payload"
                sublabel="Input data to supply to the endpoint."
              />
              <TextField
                onChange={handleChange('json')}
                value={json}
                error={isPayloadValid ? null : 'JSON is invalid.'}
              />
            </Spacing>

            <div style={{ alignSelf: 'flex-end' }}>
              <Button
                text="Start request"
                onClick={this.handleRequestClick}
                disabled={!isEndpointValid || !isPayloadValid}
              />
            </div>
          </form>
        </Spacing>

        <Button
          onClick={this.handlePanicClick}
          color={colors.red}
          text="Emergency panic"
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}

export default withForm(Command);
