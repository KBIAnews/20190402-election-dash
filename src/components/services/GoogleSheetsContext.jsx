import React from "react";

export const defaultSheetContext = {};

export const GoogleSheetsContext = React.createContext(defaultSheetContext);

export class GoogleSheetsContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageMustSuspend: true,
      pageShouldRemindScrollable: false,
      rawWorkbookData: null,
      rawSheetsData: null,
      workbookKey: null,
      showAllRaces: false
    };
  }

  setRawSheetsData(data) {
    this.setState({
      rawSheetsData: data
    });
  }

  setRawWorkbookData(data) {
    this.setState({
      rawWorkbookData: data
    });
  }

  setWorkbookKey(key) {
    this.setState({
      workbookKey: key
    });
  }

  removeSuspense() {
    this.setState({
      pageMustSuspend: false
    });
  }

  imposeSuspense() {
    this.setState({
      pageMustSuspend: true
    });
  }

  static getValueFromKeyValueSheet(sheet, key) {
    return sheet.rows.filter(el => {
      return el.key === key;
    })[0].value;
  }

  static elementIsAnnotation(el) {
    return el.categorySlug.includes("--");
  }

  getLabel(key) {
    return GoogleSheetsContextProvider.getValueFromKeyValueSheet(
      this.state.rawSheetsData.labels,
      key
    );
  }

  getCategoryColor(slug) {
    return this.state.rawSheetsData.design.rows.filter(el => {
      return el.slug === slug;
    })[0].hexcolor;
  }

  getCategoryName(slug) {
    return this.state.rawSheetsData.design.rows.filter(el => {
      return el.slug === slug;
    })[0].displayname;
  }

  getCategoriesList() {
    return this.state.rawSheetsData.design.rows
      .filter(el => {
        // Don't give me the
        return !el.slug.includes("--");
      })
      .map(el => {
        return {
          name: el.displayname,
          slug: el.slug,
          color: el.hexcolor
        };
      });
  }

  toggleShowAllRaces() {
    this.setState({
      showAllRaces: !this.state.showAllRaces
    });
  }

  getRaces() {
    let races = this.state.rawSheetsData.races.rows.map(row => ({
      priority: row.priority === "YES" ? true : false,
      slug: row.slug,
      name: row.name,
      county: row.county,
      totalPrecincts: row.totalprecincts,
      reportedPrecincts: this.state.rawSheetsData.data.rows.filter(
        el => el.raceslug === row.slug && el.candidate === "reportingPrecincts"
      )[0].value,
      candidates: this.state.rawSheetsData.data.rows
        .filter(
          el =>
            el.raceslug === row.slug && el.candidate !== "reportingPrecincts"
        )
        .map(el => ({
          name: el.candidate,
          votes: parseInt(el.value)
        })),
      totalVotes: this.state.rawSheetsData.data.rows
        .filter(
          el =>
            el.raceslug === row.slug && el.candidate !== "reportingPrecincts"
        )
        .reduce((previous, current) => {
          return previous + parseInt(current.value);
        }, 0)
    }));
    return races;
  }

  render() {
    return (
      <GoogleSheetsContext.Provider
        value={{
          ...this.state,
          setRawSheetsData: this.setRawSheetsData.bind(this),
          setRawWorkbookData: this.setRawWorkbookData.bind(this),
          setWorkbookKey: this.setWorkbookKey.bind(this),
          removeSuspense: this.removeSuspense.bind(this),
          imposeSuspense: this.imposeSuspense.bind(this),
          getLabel: this.getLabel.bind(this),
          getCategoryColor: this.getCategoryColor.bind(this),
          getCategoryName: this.getCategoryName.bind(this),
          getCategoriesList: this.getCategoriesList.bind(this),
          getRaces: this.getRaces.bind(this),
          toggleShowAllRaces: this.toggleShowAllRaces.bind(this)
        }}
      >
        {this.props.children}
      </GoogleSheetsContext.Provider>
    );
  }
}

export let GoogleSheetsContextConsumer = GoogleSheetsContext.Consumer;
