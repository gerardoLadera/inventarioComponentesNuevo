export default function LinkButton({children, active, img}) {
    return (
        <div className={`link ${(!active || active==null)?'':'active'}`}>
            <img src={img} />
            <p>
                {children}
            </p>
        </div>
    );
}