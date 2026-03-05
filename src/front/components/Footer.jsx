export const Footer = () => (
	<footer className="footer-brand mt-auto pt-5 pb-4">
		<div className="container">
			<div className="row gy-4 align-items-start">

				<div className="col-md-6">
					<div className="d-flex align-items-center gap-2 mb-2">
						<h5 className="m-0 footer-title">ApplyTracker</h5>
					</div>

					<p className="footer-subtitle mb-0">
						Track your job applications and stay organized during your job search.
					</p>
				</div>

				<div className="col-md-3">
					<h6 className="footer-heading">Navigation</h6>
					<ul className="list-unstyled footer-list">
						<li><a href="/" className="footer-link">Home</a></li>
						<li><a href="/dashboard" className="footer-link">Dashboard</a></li>
						<li><a href="/applications" className="footer-link">Applications</a></li>
						<li><a href="/add-job" className="footer-link">Add Job</a></li>
					</ul>
				</div>

				<div className="col-md-3">
					<h6 className="footer-heading">Project</h6>
					<ul className="list-unstyled footer-list">
						<li>
							<a
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
								className="footer-link d-inline-flex align-items-center gap-2"
							>
								GitHub <i className="fa-brands fa-github" />
							</a>
						</li>
					</ul>
				</div>

			</div>

			<hr className="footer-divider my-4" />

			<div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
				<div className="footer-mini">Built with React + Flask</div>
				<div className="footer-mini">© {new Date().getFullYear()} ApplyTracker</div>
			</div>
		</div>
	</footer>
);