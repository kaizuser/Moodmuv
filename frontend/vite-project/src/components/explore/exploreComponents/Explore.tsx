import React, { useEffect } from "react";

//COMPONENTS
import SelectDisciples from "./SelectDisciples";
import SelectFormat from "./SelectFormat";
import SelectType from "./SelectType";
import CardExplore from "./CardExplore";
import Search from "./Search";
import "../../../styles/mediaqueriesExplore.css";
//UTILITIES
import { connect } from "react-redux";
import teacherActions from "../../../redux/actions/teacherActions";
import activityActions from "../../../redux/actions/activityActions";
import { RootState } from "../../../main";

//INTERFACES
import activityDTO from "../../../types/activityDTO";
import imageExplore from '../../../assets/index2.jpg'

class Explore extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      disciples: "",
      format: "",
      type:"",
      max_length: 60,
      max_length_title: 26,
    };
  }

  componentDidMount() {
    this.props.fetchTeachers();
    this.props.fetchActivities();
  }

  setParameters = (value: string, camp: string) => {
    if (camp == "search") {
      this.setState({ search: value });

    } else if (camp == "disciples") {
      this.setState({ disciples: value });

    } else if (camp == 'type'){
      this.setState({ type:value })
    } else {
      this.setState({ format: value });
    }
  };

  render(): React.ReactNode {
    return (
      <div className="w-full min-h-screen">
        <div className="relative min-h-12 w-full flex flex-col gap-4 py-4 shadow-md justify-center items-center">
          <img
            className="w-full h-screen object-cover h-full pointer-events-none"
            src={imageExplore}
            alt=""
          />
          
          <div className="-bottom-4 w-fit flex justify-center items-center flex-wrap gap-4">
            <Search
              setParameters={this.setParameters}
              parameters={[
                this.state.search,
                this.state.disciples,
                this.state.format,
		this.state.type
              ]}
            />
            <SelectDisciples
              setParameters={this.setParameters}
              parameters={[
                this.state.search,
                this.state.disciples,
                this.state.format,
		this.state.type
              ]}
            />
            <SelectFormat
              setParameters={this.setParameters}
              parameters={[
                this.state.search,
                this.state.disciples,
                this.state.format,
		this.state.type
              ]}
            />

	    <SelectType
		setParameters={this.setParameters}
		parameters={[
			this.state.search,
			this.state.disciples,
			this.state.format,
			this.state.type
		]}
	    />
          </div>
        </div>
          <div className="break-all cartas w-full p-16 min-h-screen bg-[#F3F3F3] flex flex-wrap gap-8 justify-center items-start ">
            {this.props.activities && this.props.activities.map((activity: activityDTO) => (
                  <CardExplore activity={activity} max_length={this.state.max_length} max_length_title={this.state.max_length_title} resetStoreTeacher={this.props.resetStoreTeacher} resetStoreActivity={this.props.resetStoreActivity} key={activity._id}/>
                ))}
          {/* <div className="w-3/6 h-screen bg-[#222] mapita">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268123.79887572123!2d11.08380360310596!3d43.83418004934677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a5403bfe22ff5%3A0x5591438487aaf1f5!2sCatedral%20de%20Santa%20Mar%C3%ADa%20del%20Fiore!5e0!3m2!1ses-419!2sar!4v1667691210849!5m2!1ses-419!2sar"
              className="w-full h-full"
            ></iframe>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  fetchTeachers: teacherActions.fetchTeachers,
  fetchActivities: activityActions.fetchActivities,
  resetStoreTeacher:teacherActions.resetStore,
  resetStoreActivity:activityActions.resetStore

};

const mapState = (state: RootState) => {
  return {
    teachers: state.teacherReducer.teachers,
    activities: state.activityReducer.activities,
  };
};

const connector = connect(mapState, mapDispatch);

export default connector(Explore);
