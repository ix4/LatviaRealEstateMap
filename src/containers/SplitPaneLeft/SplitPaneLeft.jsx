import { riga } from '@brokalys/location-json-schemas';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { Header, Message, Statistic } from 'semantic-ui-react';

import Bugsnag from 'bugsnag';
import FilterToolbar from 'components/FilterToolbar';
import Navigation from 'components/Navigation';
import PropertyPriceChart from 'components/PropertyPriceChart';
import MeanPrice from 'components/Statistics/MeanPriceInFilterLocation';
import RentalYield from 'components/Statistics/RentalYieldInFilterLocation';
import { filterState } from 'store';

import styles from './SplitPaneLeft.module.css';

function SplitPaneLeft() {
  const [filters] = useRecoilState(filterState);
  const locationName = riga.features.find(
    (row) => row.properties.id === filters.location,
  ).properties.name;

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <Header as="h2">
          Average Prices in{' '}
          <span className={styles.highlightedText}>{locationName}</span>
        </Header>

        <FilterToolbar />
        <PropertyPriceChart />

        <div>
          <Header as="h3">Last Month</Header>

          <ErrorBoundary
            fallback={
              <Message negative>
                Failed loading the data. Please try again later.
              </Message>
            }
            onError={Bugsnag.notify}
          >
            <Statistic.Group size="small">
              <MeanPrice />
              <RentalYield />
            </Statistic.Group>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default SplitPaneLeft;
