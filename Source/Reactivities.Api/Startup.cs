namespace Reactivities.Api
{
    using System.Reflection;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Infrastructure;
    using MediatR;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        public void ConfigureServices(IServiceCollection services) =>
            services.AddControllers()
                .Services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1",
                        new()
                        {
                            Title = "Initial .Api",
                            Version = "v1"
                        });
                })
                .AddDevelopmentPersistence()
                .AddConfiguredCors(_configuration)
                .AddMediatR(Assembly.Load("Reactivities.Application"));

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Reactivities.Api v1"));
            }

            app.UseConfiguredCors();
            
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}