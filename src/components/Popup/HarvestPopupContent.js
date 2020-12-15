import React from "react";


// reactstrap components
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from "reactstrap";

import { PuffLoader} from "react-spinners";

import { getHarvestsOfFarm, getUserHarvests } from "utilities/dbOps";
import textParser from "utilities/TextParser";

export default class HarvestsPopupContent extends React.Component {
    constructor(props) {
        super(props);
        if (props.userMode) {
            this.userSub = props.userSub;
        } else {
            this.farmID = props.farmID;
        }
        this.state = {
            harvests: -1,
            activeIndex: 0,
            animating: false,
        }
    }

    componentDidMount() {
        (this.props.userMode ? getUserHarvests(this.userSub) : getHarvestsOfFarm(this.farmID))
            .then(res => {
                this.setState({
                    harvests: res,
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    harvests: -2,
                })
            })
    }

    errorOrLoadingView(phase) {
        return (
            <div className="d-flex flex-column justify-content-start align-items-center text-white">
                {
                    phase === -1 ? (<PuffLoader color="#1d8cf8" />)
                        : phase === -2 ? ([
                            <i className="tim-icons icon-alert-circle-exc py-1" />,
                            <span className="py-1">Error</span>
                        ]) : ([
                            <i className="tim-icons icon-alert-circle-exc py-1" />,
                            <span className="py-1">No Harvests Found</span>
                        ])

                }
            </div>
        );

    }

    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.harvests.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex,
        });
    }

    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.harvests.length - 1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex,
        });
    }

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({
            activeIndex: newIndex,
        });
    }

    getSlides() {
        return this.state.harvests.map(val => (
            <CarouselItem
                onExiting={() => this.setState({ animating: true })}
                onExited={() => this.setState({ animating: false })}
                key={val.id}
            >

                <div
                    style={{
                        height: "50vh",
                    }}
                >
                    <div className="d-flex flex-column justify-content-start align-items-center text-white"
                        style={{
                            height: "84%",
                            marginTop: "1%",
                            overflow: "auto",
                        }}
                    >
                        <span className="py-1">Crop: <strong>{textParser(val.crop)}</strong></span>
                        <span className="py-1">Sowing Date: <strong>{textParser(val.sowing_date)}</strong></span>
                        <span className="py-1">Seed Brand: <strong>{textParser(val.seed_brand)}</strong></span>
                        <span className="py-1">Planting Mode: <strong>{textParser(val.planting_mode)}</strong></span>
                        <span className="py-1">Weeding Mode: <strong>{textParser(val.weeding_mode)}</strong></span>
                        <span className="py-1">Harvest Cutting Mode: <strong>{textParser(val.harvest_cutting_mode)}</strong></span>
                        <span className="py-1">Fertilizer: <strong>{textParser(val.fertilizer)}</strong></span>
                        <span className="py-1">Pesticide: <strong>{textParser(val.pesticide)}</strong></span>
                        <span className="py-1">Seed Packets: <strong>{textParser(val.prev_seed_packets)}</strong></span>
                        <span className="py-1">Seed Price: <strong>{"INR " + textParser(val.prev_seed_price)}</strong></span>
                        <span className="py-1">Number of labours: <strong>{textParser(val.prev_num_labour)}</strong></span>
                        <span className="py-1">Labour Charge: <strong>{"INR " + textParser(val.prev_labour_charge)}</strong></span>
                        <span className="py-1">Machine Charge: <strong>{textParser(val.prev_machine_charge)}</strong></span>
                        <span className="py-1">Fertilizer Packets: <strong>{textParser(val.prev_fertilizer_packets)}</strong></span>
                        <span className="py-1">Fertilizer Charge: <strong>{"INR " + textParser(val.prev_fertilizer_charge)}</strong></span>
                        <span className="py-1">Pesticide Packets: <strong>{textParser(val.prev_pesticide_packets)}</strong></span>
                        <span className="py-1">Pesticide Charge: <strong>{"INR " + textParser(val.prev_pesticide_charge)}</strong></span>
                        <span className="py-1">Comments: <strong>{textParser(val.comments)}</strong></span>

                    </div>
                </div>

            </CarouselItem>
        ));
    }

    render() {
        if (this.state.harvests === -1 || this.state.harvests === -2 || this.state.harvests === 0) {
            return this.errorOrLoadingView(this.state.harvests);
        }
        else {
            return (
                <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                    interval={false}
                >
                    <CarouselIndicators items={this.state.harvests} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    {this.getSlides()}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            );
        }
    }
}