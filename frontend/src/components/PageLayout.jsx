function PageLayout({ title, children }) {
    return (
        <div className="d-flex flex-column gap-3 h-100">
            <div className="p-3 rounded bg-primary-subtle shadow-sm d-flex align-content-center">
                <h5 className="mb-0">{title}</h5>
            </div>

            <div className="d-flex flex-column flex-grow-1 rounded bg-primary-subtle p-3 gap-3 shadow-sm overflow-auto"
                style={{minHeight: 0}}
            >
                {children}
            </div>
        </div>
    );
}

export default PageLayout;