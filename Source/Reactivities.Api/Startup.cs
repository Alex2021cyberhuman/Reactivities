namespace Reactivities.Api
{
    using System;
    using System.Reflection;
    using Application.Core.Validators;
    using Extensions;
    using FluentValidation.AspNetCore;
    using Infrastructure.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using MediatR;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            var options = new AccessTokenProviderOptions(null, null, null, TimeSpan.Zero);
            _configuration.Bind(nameof(AccessTokenProviderOptions), options);
            _accessTokenProviderOptions = options;
        }

        private readonly IConfiguration _configuration;
        private readonly AccessTokenProviderOptions _accessTokenProviderOptions;

        public void ConfigureServices(IServiceCollection services) =>
            services
                .AddControllers()
                .AddFluentValidation(options =>
                {
                    options.RegisterValidatorsFromAssemblyContaining<ActivityValidator>();
                    options.LocalizationEnabled = false;
                    options.AutomaticValidationEnabled = false;
                })
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
                .AddMediatR(Assembly.Load("Reactivities.Application"))
                .AddAutoMapper(expression => expression.AddMaps(Assembly.Load("Reactivities.Application"), Assembly.Load("Reactivities.Api")))
                .AddCustomAuthorization(_accessTokenProviderOptions, _configuration);

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

            app.UseConfiguredAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}