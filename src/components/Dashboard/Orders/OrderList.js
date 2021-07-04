import React from 'react';

const OrderList = (props) => {
    console.log(props.order)
    return (
        <div className="col-12">
            <div class="table-responsive-md table-responsive-sm">
            <table class="table table-hover table align-middle">
                <thead class="table-dark">
                    <tr>
                        <th className="text-center" scope="col">Sr.</th>
                        <th className="text-center" scope="col">ProductId</th>
                        <th className="text-center" scope="col">ProductName</th>
                        <th className="text-center" scope="col">ProductQuantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.order.map((ord, index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td className="text-danger text-center">{ord.productId}</td>
                                <td className="text-primary text-center">{ord.productName}</td>
                                <td className="text-success fw-bold text-center">{ord.productQuantity}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default OrderList;